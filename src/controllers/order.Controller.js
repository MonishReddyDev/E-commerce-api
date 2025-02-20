
import Order from "../models/order.models/order.model.js";
import { getAnyUserOrdersService, updateOrderService } from "../services/order.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import { CustomError } from "../utils/customeError.js";
import { responseMessages } from "../utils/messages.js";
import sendSuccessResponse from "../utils/responseHandler.js"







// Get any orders of a user
export const getAnyUserOrders = asyncErrorHandler(async (req, res) => {

    const { userId } = req.params;

    // Call the service to fetch all orders
    const orders = await getAnyUserOrdersService(userId);

    sendSuccessResponse(res, 200, responseMessages.ordercreated, { orders })

});

// Get any orders of a user
export const getUserOrders = asyncErrorHandler(async (req, res) => {

    const userId = req.user.id

    // Call the service to fetch all orders
    const orders = await getAnyUserOrdersService(userId);
    sendSuccessResponse(res, 200, responseMessages.success, { orders })

});

// Update order status
export const updateOrder = asyncErrorHandler(async (req, res) => {
    const updates = req.body;
    const { orderId } = req.params;

    const order = await updateOrderService(updates, orderId)
    

    sendSuccessResponse(res, 200, responseMessages.success, { order })

});
