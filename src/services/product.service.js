import slugify from "slugify"
import Connection from "../db/connect.js"
import {
  categoryString,
  productPriceString,
  productString,
  receiptString,
  receiptdetailString,
  recipeString,
} from "../constance/entityName.js"
import { appendToObject, getSelectData, pickUpContent } from "../utils/index.js"
import {
  findCategory,
  findCategoryByName,
  findCategoryById,
  findProductById,
  updateProductById,
  findProduct,
} from "../repository/product.repository.js"
import { ConflictRequest, NotFoundRequest } from "../core/error.response.js"
import { Like } from "typeorm"

class ProductService {
  // Product

  async createReceipt({
    receiptType,
    idSupplier,
    idStaff,
    receiptDetail,
    ...rest
  }) {
    // Caculate total receipt
    const total = receiptDetail.reduce((previousValue, currentDetail) => {
      return previousValue + currentDetail.priceOfOne * currentDetail.quantity
    }, 0)

    // Create transaction receipt and receipt detail
    await Connection.getInstance().transaction(
      async (transactionEntityManager) => {
        const resultInsertReceipt = await transactionEntityManager
          .getRepository(receiptString)
          .insert({
            receiptType,
            idSupplier,
            idStaff,
            total,
            ...rest,
          })
        await transactionEntityManager
          .getRepository(receiptdetailString)
          .insert(
            appendToObject(
              receiptDetail,
              "idReceipt",
              resultInsertReceipt.raw.insertId
            )
          )
      }
    )
  }

  async createProduct({
    productName,
    productType,
    idCategory,
    recipeInfo,
    ...rest
  }) {
    // Transaction product, productprice and recipe
    let resultInsertProduct = null
    await Connection.getInstance().transaction(
      async (transactionEntityManager) => {
        resultInsertProduct = await transactionEntityManager
          .getRepository(productString)
          .insert({
            productName,
            slug: slugify(productName, { lower: true }),
            productType,
            idCategory,
            ...rest,
          })
        await transactionEntityManager
          .getRepository(recipeString)
          .insert(
            appendToObject(
              recipeInfo,
              "idProduct",
              resultInsertProduct.raw.insertId
            )
          )
      }
    )

    // Calculate cost and price
    // 1. Query ingredient corresponding to recipe and select ingredient.price
    const ingredientOfRecipe = await Connection.getInstance()
      .getRepository(recipeString)
      .find({
        relations: {
          ingredientRelation: true,
        },
        where: {
          idProduct: resultInsertProduct.raw.insertId,
        },
      })
    // 2. Total all this => productPrice.cost
    const cost = ingredientOfRecipe.reduce((previousValue, currentValue) => {
      return (
        previousValue +
        currentValue.quantity * currentValue.ingredientRelation.priceOfOne
      )
    }, 0)
    // 3. Multi with 10% price of this
    const price = cost * 1.1

    // Insert to productPrice
    await Connection.getInstance().getRepository(productPriceString).insert({
      idProduct: resultInsertProduct.raw.insertId,
      productName,
      price,
      cost,
    })
  }

  async publishProduct(idProduct) {
    const foundProduct = await findProductById({ idProduct })
    if (!foundProduct) {
      throw new NotFoundRequest()
    }
    const dataSet = { isPublish: 1 }
    await updateProductById({ idProduct, dataSet })
  }

  async unPublishProduct(idProduct) {
    const foundProduct = await findProductById({ idProduct })
    if (!foundProduct) {
      throw new NotFoundRequest()
    }
    const dataSet = { isPublish: 0 }
    await updateProductById({ idProduct, dataSet })
  }

  async getAllProductOfCategory(idCategory) {
    const relations = { productRelation: true }
    const dataUnSelect = [
      "productRelation.idProduct",
      "productRelation.productName",
      "productRelation.slug",
      "productRelation.image",
      "productRelation.productType",
      "productRelation.isDirect",
      "productRelation.idCategory",
    ]
    const foundCategory = await findCategoryById({
      idCategory,
      relations,
      select: getSelectData(dataUnSelect),
    })
    if (!foundCategory) {
      throw new NotFoundRequest("Category is not exist")
    }
    return foundCategory.productRelation
  }

  async getProduct(idProduct) {
    const select = [
      "idProduct",
      "productName",
      "slug",
      "image",
      "productType",
      "isDirect",
      "idCategory",
    ]
    const foundProduct = await findProductById({idProduct, select})
    if(!foundProduct) {
      throw new NotFoundRequest("Product is not exist")
    }
    return foundProduct
  }

  async searchProduct(keyword) {
    const select = [
      "idProduct",
      "productName",
      "slug",
      "image",
      "productType",
      "isDirect",
      "idCategory",
    ]
    const foundProducts = await findProduct({
      where: {
        productName: Like(`%${keyword}%`)
      },
      select
    })
    if(!foundProducts) {
      throw new NotFoundRequest("Product is not exist")
    }
    return foundProducts
  }

  async updateProduct({idProduct, dataSet}) {
    const select = [
      "idProduct",
      "productName",
      "slug",
      "image",
      "productType",
      "isDirect",
      "idCategory",
    ]
    const foundProduct = await findProductById({idProduct, select})
    if(!foundProduct) {
      throw new NotFoundRequest("Product is not exist")
    }
    const modifyProduct = await updateProductById({idProduct, dataSet})
    return modifyProduct
  }


  // Category

  async createCategory({categoryName, image = null}) {
    const foundCatgory = await findCategoryByName({ categoryName })
    if (foundCatgory) {
      throw new ConflictRequest("Category is exist")
    }
    return await Connection.getInstance()
      .getRepository(categoryString)
      .insert({ categoryName, image })
  }

  async getAllCategory() {
    return await findCategory({})
  }

}

export default new ProductService()
