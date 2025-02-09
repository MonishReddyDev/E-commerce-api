import express from "express";
import authenticateJWT from "../middleware/auth.middleware.js";
import { getAnyUserOrders, getUserOrders, placeOrder, updateOrder } from "../controllers/order.controller.js";
import { authorizeRole } from "../middleware/authRole.middleware.js";

const router = express.Router();



router.post("/create", authenticateJWT, authorizeRole(['admin', 'user']), placeOrder)

router.get("/user", authenticateJWT, authorizeRole(['user', 'admin']), getUserOrders)

router.get("/admin/:userId", authenticateJWT, authorizeRole(['admin']), getAnyUserOrders)

//Update order status
router.put("/:orderId/status", authenticateJWT, authorizeRole(['admin']), updateOrder)


export default router;
