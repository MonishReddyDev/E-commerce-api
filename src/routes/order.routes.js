import express from "express";
import authenticateJWT from "../middleware/auth.middleware.js";
import { getAnyUserOrders, getUserOrders, updateOrder } from "../controllers/order.Controller.js";
import { authorizeRole } from "../middleware/authRole.middleware.js";
import { cancelOrderService } from "../services/order.service.js"


const router = express.Router();


router.post('/cancel', authenticateJWT, cancelOrderService)

router.get("/user", authenticateJWT, authorizeRole(['user', 'admin']), getUserOrders)

router.get("/admin/:userId", authenticateJWT, authorizeRole(['admin']), getAnyUserOrders)

//Update order status
router.put("/:orderId/status", authenticateJWT, authorizeRole(['admin']), updateOrder)


export default router;
