import Connection from "../db/connect.js"
import { ingredientString, receiptString, receiptdetailString, warehouseString } from "../constance/entityName.js"
import { appendAllObject } from "../utils/index.js"

class ProductService {

  async createReceipt({ receiptType, idSupplier, idStaff, receiptDetail, ...rest }) {
    // Caculate total receipt
    const total = receiptDetail.reduce((previousValue, currentDetail) => {
      return previousValue + currentDetail.price * currentDetail.quantity
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
      await transactionEntityManager.getRepository(receiptdetailString).insert(appendAllObject(receiptDetail, "idReceipt", resultInsertReceipt.raw.insertId))
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