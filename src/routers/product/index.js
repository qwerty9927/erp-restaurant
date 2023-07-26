import { Router } from "express";
import ProductController from "../../controllers/product.controller.js";
import checkAuth from "../../auth/checkAuth.js";
import checkPermission from "../../auth/checkPermission.js";
import accessible from "../../auth/accessible.js";

const router = Router();

// Authorization
router.use(checkAuth)

// Permission
router.use(checkPermission)

// [3, 4]
router.use(accessible([4]))
router.put("/createReceipt", ProductController.createReceipt)


// // All product
// router.get("/", ProductController.getAllProduct);

// // Detail product
// router.get('/:idProduct', ProductController.getDetailProduct)

export default router;
