import { Router } from "express";
import ProductController from "../../controllers/product.controller.js";
import checkAuth from "../../auth/checkAuth.js";
import checkPermission from "../../auth/checkPermission.js";
import accessible from "../../auth/accessible.js";

const router = Router();

// All
router.get("/getAllProductOfCategory", ProductController.getAllProductOfCategory)
router.get("/getProduct", ProductController.getProduct)
router.get("/searchProduct", ProductController.searchProduct)
router.get("/getAllCategory", ProductController.getAllCategory)

// Authorization
router.use(checkAuth)

// Permission
router.use(checkPermission)


// [3, 4]
router.use(accessible([3, 4]))
router.put("/createReceipt", ProductController.createReceipt)
router.patch("/publishProduct", ProductController.publishProduct)
router.patch("/unPublishProduct", ProductController.unPublishProduct)
router.patch("/updateProduct", ProductController.updateProduct)

router.use(accessible([4]))
router.put("/createProduct", ProductController.createProduct)
router.put("/createCategory", ProductController.createCategory)


export default router;
