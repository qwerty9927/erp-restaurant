import { Router } from "express";
import AuthController from "../../controllers/auth.controller.js";
import checkAuth from "../../auth/checkAuth.js";
import checkPermission from "../../auth/checkPermission.js";
import accessible from "../../auth/accessible.js";

const router = Router()

router.post("/login", AuthController.login)

// Authorization
router.use(checkAuth)

// Permission 
router.use(checkPermission)

// All [1, 2, 3, 4]
router.patch("/changePassword", AuthController.changePassword)
router.get("/logout", AuthController.logout)

// [3, 4]
router.use(accessible([3, 4]))
router.put("/createAccount", AuthController.createAccount)

// [4]
router.use(accessible([4]))
router.patch("/lockAccount", AuthController.lockAccount)
router.patch("/unLockAccount", AuthController.unLockAccount)


export default router