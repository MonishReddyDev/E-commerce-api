import express from "express";
import authenticateJWT from "../middleware/auth.middleware.js";
import { getAllOrders, placeOrder, updateOrder } from "../controllers/order.controller.js";

const router = express.Router();



router.post("/create", authenticateJWT, placeOrder)
router.get("/user/:userId", authenticateJWT, getAllOrders)
router.put("/:orderId/status", authenticateJWT, updateOrder)


export default router;
