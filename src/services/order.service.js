// services/order.service.js
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js"
import { calculateTotalPrice, decreaseStock } from "../utils/custom.js";
import { CustomError } from "../utils/customeError.js";
import User from "../models/user.model.js"


export const placeOrderService = async (userId) => {

    // Fetch the user's cart and populate the product details
    const userCart = await Cart.findOne({ user: userId }).populate('items.product', 'price countInStock');

    // Check if the cart exists
    if (!userCart) {
        throw new CustomError("Cart not found for the user.", 404);
    }

    // Check if the cart is empty
    if (userCart.items.length === 0) {
        throw new CustomError("Your cart is empty. Please add items to your cart before placing an order.", 400);
    }

    const totalAmount = await calculateTotalPrice(userCart)

    await decreaseStock(userCart)

    // Get the username of the user who placed the order
    const user = await User.findById(userId);
    if (!user) {
        throw new CustomError("User not found.", 404);
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
        throw new CustomError("Error occurred while placing the order.", 500); // If order save fails, stop here
    }

    return newOrder;
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
