import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import checkAuth from "../../auth/checkAuth.js";

const router = Router()

router.post("/login", AuthController.login)

router.use(checkAuth)

router.post("/createAccount", AuthController.createAccount)

export default router