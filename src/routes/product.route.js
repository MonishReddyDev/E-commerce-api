
import express from 'express';
import authenticateJWT from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/authRole.middleware.js';
import { createProduct, deleteProduct, getAllProducts, getProductById, searchProduct, updateProduct } from '../controllers/product.Controller.js';

const router = express.Router();

//This should  only can access by admin change pending have to add like admin condition to this not only jwt
router.post("/admin/create", authenticateJWT, authorizeRole(['admin']), createProduct)
router.put("/admin/:id", authenticateJWT, authorizeRole(['admin']), updateProduct)
router.delete("/admin/:id", authenticateJWT, authorizeRole(['admin']), deleteProduct)

//public
router.get("/getAll", getAllProducts)


// Product Search (by name, category, price)
router.get("/", authenticateJWT, authorizeRole(['user']), searchProduct)


router.get("/:id", getProductById)
export default router;
