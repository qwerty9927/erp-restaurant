import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import checkAuth from "../../auth/checkAuth.js";

const router = Router()

router.post("/login", AuthController.login)

// Authorization
router.use(checkAuth)

router.post("/createAccount", AuthController.createAccount)

router.post("/changePassword", AuthController.changePassword)

router.get("/logout", AuthController.logout)

export default router