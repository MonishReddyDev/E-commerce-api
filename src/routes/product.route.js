
import express from 'express';
import authenticateJWT from '../middleware/auth.middleware.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from '../controllers/product.controller.js';

const router = express.Router();

//This should  only can access by admin change pending have to add like admin condition to this not only jwt
router.post("/create", authenticateJWT, createProduct)
router.put("/:id", authenticateJWT, updateProduct)
router.delete("/:id", authenticateJWT, deleteProduct)

//public
router.get("/getAll", getAllProducts)
router.get("/:id", getProductById)

export default router;
