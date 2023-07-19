import { Router } from "express";
import ProductController from "../../controllers/product.controller.js";

const router = Router();

// All product
router.get("/", ProductController.getAllProduct);

// Detail product
router.get('/:idProduct', ProductController.getDetailProduct)
export default router;
