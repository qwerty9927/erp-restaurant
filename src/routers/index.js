import { Router } from "express";
import productRouter from './product/index.js'
import authRouter from "./auth/index.js"
import receiptRouter from "./receipt/index.js"
import checkAuth from "../auth/checkAuth.js";
import checkPermission from "../auth/checkPermission.js";
import modelTest from "../tests/modelTest.js";
import jsTest from "../tests/jsTest.js";

const router = Router()

// Authentication
router.use("/v1/api/auth", authRouter)

// Product
router.use("/v1/api/product", productRouter)

// Receipt
router.use("/v1/api/receipt", receiptRouter)

// Test enviroment
// Model test
router.get("/modelTest/:key", modelTest)
// JavaScript test
router.get("/jsTest/:key", jsTest)
// Authorization
router.use(checkAuth)
// Permission
router.use(checkPermission)
// Test middleware
router.get('/checkAuth', (req, res, next) => res.send("Test done"))
router.get('/checkPermission', (req, res, next) => res.send("Test done"))

export default router