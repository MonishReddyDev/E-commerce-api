import express from "express";
import { addToCart, removeFromCart, updateCart } from "../controllers/cart.controller.js";
import authenticateJWT from "../middleware/auth.middleware.js";

const router = express.Router();

// Route for adding product to the cart
router.post("/add", authenticateJWT, addToCart);
router.post("/update", authenticateJWT, updateCart);
router.post("/remove", authenticateJWT, removeFromCart);


export default router;
