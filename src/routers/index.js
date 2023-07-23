import { Router } from "express";
import productRouter from './product/index.js'
import authRouter from "./auth/index.js"
import checkAuth from "../auth/checkAuth.js";
import modelTest from "../tests/modelTest.js";
import checkPermission from "../auth/checkPermission.js";

const router = Router()

// Model test
router.get("/modelTest/:key", modelTest)

// Authentication
router.use("/v1/api/auth", authRouter)

// Authorization
router.use(checkAuth)

// Permission
router.use(checkPermission)

// Product
router.use("/v1/api/product", productRouter)

// Test middleware
router.get('/checkAuth', (req, res, next) => res.send("Test done"))
router.get('/checkPermission', (req, res, next) => res.send("Test done"))

export default router