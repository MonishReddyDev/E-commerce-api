
import express from 'express';
import authenticateJWT from '../middleware/auth.middleware.js';
import { authorizeRole } from '../middleware/authRole.middleware.js';
import { searchProduct } from '../controllers/search.Controller.js';

const router = express.Router();


// Product Search (by name, category, price)
router.get("/product", authenticateJWT, authorizeRole(['user']), searchProduct)


export default router;
