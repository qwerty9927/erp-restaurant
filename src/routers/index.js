import { Router } from "express";
import productRouter from './product/index.js'

const router = Router()

// Product
router.use("/v1/api/product", productRouter)

export default router