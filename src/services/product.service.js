import Connection from "../db/connect.js"
import { productPriceString, productString, receiptString, receiptdetailString, recipeString } from "../constance/entityName.js"
import { appendToObject } from "../utils/index.js"

class ProductService {

  async createReceipt({ receiptType, idSupplier, idStaff, receiptDetail, ...rest }) {
    // Caculate total receipt
    const total = receiptDetail.reduce((previousValue, currentDetail) => {
      return previousValue + currentDetail.priceOfOne * currentDetail.quantity
    }, 0)

    // Create transaction receipt and receipt detail
    await Connection.getInstance().transaction(async transactionEntityManager => {
      const resultInsertReceipt = await transactionEntityManager.getRepository(receiptString).insert({
        receiptType,
        idSupplier,
        idStaff,
        total,
        ...rest
      })
      await transactionEntityManager.getRepository(receiptdetailString).insert(appendToObject(receiptDetail, "idReceipt", resultInsertReceipt.raw.insertId))
    })
  }

  async createProduct({ productName, productType, idCategory, recipeInfo, ...rest }) {
    // Transaction product, productprice and recipe
    let resultInsertProduct = null
    await Connection.getInstance().transaction(async transactionEntityManager => {
      resultInsertProduct = await transactionEntityManager.getRepository(productString).insert({
        productName,
        productType,
        idCategory,
        ...rest
      })
      await transactionEntityManager.getRepository(recipeString).insert(appendToObject(recipeInfo, "idProduct", resultInsertProduct.raw.insertId))
    })

     // Calculate cost and price
    // 1. Query ingredient corresponding to recipe and select ingredient.price
    const ingredientOfRecipe = await Connection.getInstance().getRepository(recipeString).find({
      relations: {
        ingredientRelation: true
      },
      where: {
        idProduct: resultInsertProduct.raw.insertId
      }
    })
    // 2. Total all this => recipe.cost
    const cost = ingredientOfRecipe.reduce((previousValue, currentValue) => {
      return previousValue + currentValue.quantity * currentValue.ingredientRelation.priceOfOne
    }, 0)
    // 3. Multi with 10% price of this
    const price = cost * 1.1
    
    // Insert to productPrice
    await Connection.getInstance().getRepository(productPriceString).insert({
      idProduct: resultInsertProduct.raw.insertId,
      productName,
      price,
      cost
    })
  }

  // // Get all
  // async getAllProduct() {
  //   const products = await Connection.getInstance().manager.findBy(Product, {
  //     isDelete: 0
  //   })
  //   return products
  // }

  // // Get detail product
  // async getDetailProduct({ idProduct }) {
  //   console.log(idProduct)
  //   const product = await Connection.getInstance().manager.findOne(Product, {
  //     select: ["idProduct", "productName", "image", "productType", "isDirect", "idCategory"],
  //     where: {
  //       idProduct
  //     }
  //   })
  //   return product
  // }

  // Find product

  // Create Product

  // Update Product

  // Hidden Product

}

export default new ProductService