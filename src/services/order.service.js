// services/order.service.js
import Order from "../models/order.model.js"
import { calculateTotalPrice, decreaseStock } from "../utils/custom.js";
import { CustomError } from "../utils/CustomeError.js";
import logger from "../utils/logger.js"
import stripe from "../utils/stripe.js";




// Place a new order
export const placeOrderService = async (userId, products, idempotencyKey, loggedInUser) => {


    if (!products || products.length === 0) {
        throw new Error("Products array cannot be empty");
    }

    if (userId !== loggedInUser) {
        throw new Error("You can only place an order for yourself.!");
    }

    const existingOrder = await Order.findOne({ userId, idempotencyKey })

    if (existingOrder) {
        logger.info("The order already exist ")
        return existingOrder;
    }

    const totalAmount = await calculateTotalPrice(products)

    const newOrder = new Order({
        userId, products, totalAmount, idempotencyKey
    });

    await newOrder.save();

    // Update the stock for each product
    await decreaseStock(products);

    return { newOrder };
};

// Get all orders for a user
export const getAnyUserOrdersService = async (userId) => {

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
