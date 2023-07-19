import Connection from "../db/connect.js"
import Product from "../models/product.model.js"

class ProductService {

  // Get all
  async getAllProduct() {
    const products = await Connection.getInstance().manager.findBy(Product, {
      isDelete: 0
    })
    return products
  }

  // Get detail product
  async getDetailProduct({ idProduct }) {
    console.log(idProduct)
    const product = await Connection.getInstance().manager.findOne(Product, {
      select: ["idProduct", "productName", "image", "productType", "isDirect", "idCategory"],
      where: {
        idProduct
      }
    })
    return product
  }

  // Find product

  // Create Product

  // Update Product

  // Hidden Product

}

export default new ProductService