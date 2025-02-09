// controllers/order.controller.js

import { getAnyUserOrdersService, placeOrderService, updateOrderService } from "../services/order.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"


// Place a new order
export const placeOrder = asyncErrorHandler(async (req, res) => {
    const { userId, products, idempotencyKey } = req.body;
    const loggedInUser = req.user.id

    // Call the service to place the order
    const newOrder = await placeOrderService(userId, products, idempotencyKey, loggedInUser);

    res.status(201).json({
        order: newOrder,
    });
});


// Get any orders of a user
export const getAnyUserOrders = asyncErrorHandler(async (req, res) => {

    const { userId } = req.params;

    // Call the service to fetch all orders
    const orders = await getAnyUserOrdersService(userId);
    res.status(200).json(orders);
});



// Get any orders of a user
export const getUserOrders = asyncErrorHandler(async (req, res) => {

    const userId = req.user.id

    // Call the service to fetch all orders
    const orders = await getAnyUserOrdersService(userId);
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
