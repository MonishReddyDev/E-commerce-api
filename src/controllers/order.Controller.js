// controllers/order.controller.js

import { getAllOrdersService, placeOrderService, updateOrderService } from "../services/order.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
// Place a new order
export const placeOrder = asyncErrorHandler(async (req, res) => {
    const { userId, products, totalAmount } = req.body;

    // Call the service to place the order
    const newOrder = await placeOrderService(userId, products, totalAmount);
    res.status(201).json(newOrder);
});

// Get all orders for a user
export const getAllOrders = asyncErrorHandler(async (req, res) => {
    const { userId } = req.params;

    // Call the service to fetch all orders
    const orders = await getAllOrdersService(userId);
    res.status(200).json(orders);
});

// Update order status
export const updateOrder = asyncErrorHandler(async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;

    // Call the service function to update the order
    const result = await updateOrderService(orderId, status);
    res.status(200).json(result.updatedOrder);
});
