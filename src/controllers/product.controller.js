import ProductService from "../services/product.service.js"
import { SuccessResponse } from "../core/success.response.js"

class ProductController {
  async createReceipt(req, res, next) {
    try {
      const payload = req.body
      await ProductService.createReceipt(payload)
      new SuccessResponse({
        message: "Create receipt success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async createProduct(req, res, next) {
    try {
      const payload = req.body
      await ProductService.createProduct(payload)
      new SuccessResponse({
        message: "Create product success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async publishProduct(req, res, next) {
    try {
      const { idProduct } = req.body
      await ProductService.publishProduct(idProduct)
      new SuccessResponse({
        message: "Visible product success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async unPublishProduct(req, res, next) {
    try {
      const { idProduct } = req.body
      await ProductService.unPublishProduct(idProduct)
      new SuccessResponse({
        message: "UnVisible product success",
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async getAllProductOfCategory(req, res, next) {
    try {
      const { idCategory } = req.query
      new SuccessResponse({
        message: "Get product success",
        metadata: await ProductService.getAllProductOfCategory(idCategory),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async getProduct(req, res, next) {
    try {
      const { idProduct } = req.query
      new SuccessResponse({
        message: "Get product success",
        metadata: await ProductService.getProduct(idProduct),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async searchProduct(req, res, next) {
    try {
      const { keyword } = req.query
      new SuccessResponse({
        message: "Search product success",
        metadata: await ProductService.searchProduct(keyword),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async updateProduct(req, res, next) {
    try {
      const payload = req.body
      new SuccessResponse({
        message: "Update product success",
        metadata: await ProductService.updateProduct(payload),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async createCategory(req, res, next) {
    try {
      const payload = req.body
      new SuccessResponse({
        message: "Create category success",
        metadata: await ProductService.createCategory(payload),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }

  async getAllCategory(req, res, next) {
    try {
      new SuccessResponse({
        message: "Get category success",
        metadata: await ProductService.getAllCategory(),
      }).send({ res })
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductController()
