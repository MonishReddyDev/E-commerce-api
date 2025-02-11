// services/order.service.js
import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js"
import { calculateTotalPrice, decreaseStock } from "../utils/custom.js";
import { CustomError } from "../utils/customeError.js";



export const placeOrderService = async (userId, loggedInUser) => {


    // Check if the logged-in user matches the userId
    if (userId !== loggedInUser) {
        throw new CustomError("You can only place an order for yourself.", 403);
    }
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

    // Place the order
    const newOrder = new Order({
        user: userId,
        products: userCart.items,
        totalAmount,
    });

    // Save the order
    await newOrder.save();

    // Clear the cart after placing the order
    await Cart.findOneAndUpdate({ user: userId }, { items: [] });

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
