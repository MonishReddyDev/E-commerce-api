import express from "express";
import { addToCart, removeFromCart, updateCart } from "../controllers/cart.controller.js";
import authenticateJWT from "../middleware/auth.middleware.js";
import { authorizeRole } from "../middleware/authRole.middleware.js";

const router = express.Router();

// Route for adding product to the cart
router.post("/add", authenticateJWT, authorizeRole(['admin', 'user']), addToCart);
router.post("/update", authenticateJWT, authorizeRole(['admin', 'user']), updateCart);
router.post("/remove", authenticateJWT, authorizeRole(['admin', 'user']), removeFromCart);


export default router;
