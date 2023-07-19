import ProductService from "../services/product.service.js"
import { SuccessResponse } from "../core/success.response.js"

class ProductController {
  async getAllProduct(req, res, next) {
    new SuccessResponse({
      metadata: await ProductService.getAllProduct()
    }).send({ res })
  }

  async getDetailProduct(req, res, next) {
    new SuccessResponse({
      metadata: await ProductService.getDetailProduct(req.params)
    }).send({ res })
  }
}

export default new ProductController