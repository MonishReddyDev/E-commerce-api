// services/order.service.js
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js"
import { calculateTotalPrice, decreaseStock } from "../utils/custom.js";
import { CustomError } from "../utils/customeError.js";
import User from "../models/user.model.js"
import { ERROR_MESSAGES } from "../utils/messages.js";


export const placeOrderService = async (userId) => {

    // Fetch the user's cart and populate the product details
    const userCart = await Cart.findOne({ user: userId }).populate('items.product', 'price countInStock');

    // Check if the cart exists
    if (!userCart) {
        throw new CustomError(ERROR_MESSAGES.CART_NOT_FOUND_USER, 404);
    }

    // Check if the cart is empty
    if (userCart.items.length === 0) {
        throw new CustomError(ERROR_MESSAGES.CART_EMPTY, 400);
    }

    let totalAmount = await calculateTotalPrice(userCart)
    totalAmount = (totalAmount * 100) / 100

    await decreaseStock(userCart)

    // Get the username of the user who placed the order
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError(ERROR_MESSAGES.USER_NOT_FOUND, 404);
    }

    const username = user.username;  // Get the username

    // Place the order
    const newOrder = new Order({
        userId,
        username,
        products: userCart.items,
        totalAmount,
    });

    // Clear the cart 
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

    try {
        // Save the order only if all checks pass and stock is successfully decreased
        await newOrder.save();
    } catch (error) {
        throw new CustomError(ERROR_MESSAGES.ORDER_SAVE_ERROR, 500); // If order save fails, stop here
    }

    return newOrder;
};


// Get all orders for a user
export const getAnyUserOrdersService = async (userId) => {

    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
        throw new CustomError(ERROR_MESSAGES.NO_ORDERS_FOUND, 404);
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
        throw new CustomError(ERROR_MESSAGES.NO_ORDERS_FOUND, 404);
    }

    return { updatedOrder };
};
