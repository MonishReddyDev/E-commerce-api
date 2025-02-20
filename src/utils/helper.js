import Cart from "../models/cart.model.js"
import Order from "../models/order.models/order.model.js";
import { CustomError } from "./customeError.js";
import { ERROR_MESSAGES } from "./messages.js";
import logger from "../utils/logger.js"


export const getUserCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'price countInStock')
    if (!cart) throw new CustomError(ERROR_MESSAGES.CART_NOT_FOUND_USER, 404);
    return cart
}


export const validateCart = (cart) => {
    if (cart.items.length === 0) throw new CustomError(ERROR_MESSAGES.CART_EMPTY, 400);

}


export const createOrder = async (userId, cart, totalAmount, paymentMethod, paymentStatus, paymentIntentId) => {
    try {
        const order = new Order({
            userId,
            items: cart.items,
            totalAmount: parseFloat(totalAmount.toFixed(2)),
            orderStatus: "pending",
            paymentStatus,
            paymentMethod,
            paymentIntentId
        });
        await order.save();
        return order;
    } catch (error) {
        throw error; // Optionally, rethrow the error to handle it in the calling function
    }
};




export const clearCart = async (userId) => {
    await Cart.findOneAndUpdate({ user: userId }, { items: [], })
    logger.info("Cart is cleared")
}