// services/order.service.js
import Order from "../models/order.model.js"
import { CustomError } from "../utils/CustomeError.js"

// Place a new order
export const placeOrderService = async (userId, products, totalAmount) => {
    const newOrder = new Order({ userId, products, totalAmount });
    await newOrder.save();
    return newOrder;
};

// Get all orders for a user
export const getAllOrdersService = async (userId) => {
    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
        throw new CustomError("No orders found for this user", 404);
    }
    return orders;
};

// Update an order's status
export const updateOrderService = async (orderId, status) => {
    const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
    );

    if (!updatedOrder) {
        throw new CustomError("Order not found", 404);
    }

    return { updatedOrder };
};
