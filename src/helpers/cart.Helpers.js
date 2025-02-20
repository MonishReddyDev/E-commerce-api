import Cart from "../models/cart.model.js"
import { ERROR_MESSAGES } from "../utils/messages.js"
import logger from "../utils/logger.js"
import { CustomError } from "../utils/customeError.js";


export const getUserCart = async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate('items.product', 'price countInStock')
    if (!cart) throw new CustomError(ERROR_MESSAGES.CART_NOT_FOUND_USER, 404);
    return cart
}


export const validateCart = (cart) => {
    if (cart.items.length === 0) throw new CustomError(ERROR_MESSAGES.CART_EMPTY, 400);

}

export const clearCart = async (userId) => {
    await Cart.findOneAndUpdate({ user: userId }, { items: [], })
    logger.info("Cart is cleared")
}