import { Router } from "express";
import productRouter from './product/index.js'
import authRouter from "./auth/index.js"
import checkAuth from "../auth/checkAuth.js";
import modelTest from "../tests/modelTest.js";

const router = Router()

// Model test
router.get("/modelTest/:key", modelTest)

// Authentication
router.use("/v1/api/auth", authRouter)

// Authorization
router.use(checkAuth)

// Product
router.use("/v1/api/product", productRouter)

// CheckAuth test
router.get('/checkAuthTest', (req, res, next) => res.send("Test done"))

export default router