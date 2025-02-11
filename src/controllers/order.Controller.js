import Cart from "../models/cart.model.js";
import Order from "../models/order.model.js";
import { getAnyUserOrdersService, placeOrderService, updateOrderService } from "../services/order.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"

export const placeOrderController = asyncErrorHandler(async (req, res) => {
    const userId = req.body.userId;
    const loggedInUser = req.user.id;

    // Call the service to place the order
    const newOrder = await placeOrderService(userId, loggedInUser);

    // Send response
    res.status(201).json({
        success: true,
        message: "Order placed successfully.",
        order: newOrder,
    });
});

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


export const PlaceOrder = asyncErrorHandler(async (req, res) => {
    const userId = req.body.userId;
    const loggedInUser = req.user.id


    if (userId !== loggedInUser) {
        throw new Error("You can only place an order for yourself.!");
    }

    // Fetch the user's cart and populate the product details
    const userCart = await Cart.findOne({ user: userId }).populate('items.product', 'price countInStock');


    // Check if the cart exists
    if (!userCart) {
        throw new Error("Cart not found for the user.");
    }

    // Check if the cart is empty
    if (userCart.items.length === 0) {
        throw new Error("Your cart is empty. Please add items to your cart before placing an order.");
    }

    // Validate product availability and calculate the total price
    let totalAmount = 0;
    for (const item of userCart.items) {
        const product = item.product;
        console.log(product)

        if (!product) {
            throw new Error(`Product with ID ${item.product} not found.`);
        }

        if (product.countInStock < item.quantity) {
            throw new Error(`Product ${product._id} is out of stock.`);
        }

        totalAmount += product.price * item.quantity;
    }

    // Deduct stock for each product
    for (const item of userCart.items) {
        const product = item.product;
        product.countInStock -= item.quantity;
        await product.save();
    }

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

    res.status(201).json({
        success: true,
        message: "Order placed successfully.",
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
