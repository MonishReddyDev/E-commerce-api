import { getAnyUserOrdersService, placeOrderService, updateOrderService } from "../services/order.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import sendSuccessResponse from "../utils/responseHandler.js"



export const placeOrder = asyncErrorHandler(async (req, res) => {

    // const userId = req.user.id;
    const userId = req.body.userId;

    // Call the service to place the order
    const newOrder = await placeOrderService(userId);

    sendSuccessResponse(res, 201, "Order placed successfully.", newOrder)

});

// Get any orders of a user
export const getAnyUserOrders = asyncErrorHandler(async (req, res) => {

    const { userId } = req.params;

    // Call the service to fetch all orders
    const orders = await getAnyUserOrdersService(userId);

    sendSuccessResponse(res, 200, "Success", orders)

});

// Get any orders of a user
export const getUserOrders = asyncErrorHandler(async (req, res) => {

    const userId = req.user.id

    // Call the service to fetch all orders
    const orders = await getAnyUserOrdersService(userId);
    sendSuccessResponse(res, 200, "Success", orders)

});

// Update order status
export const updateOrder = asyncErrorHandler(async (req, res) => {
    const { status } = req.body;
    const { orderId } = req.params;

    // Call the service function to update the order
    const result = await updateOrderService(orderId, status);

    sendSuccessResponse(res, 200, "Success", result.updatedOrder)

});
