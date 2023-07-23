import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import checkAuth from "../../auth/checkAuth.js";

const router = Router()

router.post("/login", AuthController.login)

// Authorization
router.use(checkAuth)

router.put("/createAccount", AuthController.createAccount)

router.patch("/changePassword", AuthController.changePassword)

router.get("/logout", AuthController.logout)

router.patch("/lockAccount", AuthController.lockAccount)

router.patch("/unLockAccount", AuthController.unLockAccount)

export default router