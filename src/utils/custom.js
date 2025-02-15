import Cart from "../models/cart.model.js";
import { CustomError } from "./customeError.js";



export function roundUpToTwo(number) {
    return Math.ceil(number * 100) / 100;
}

export const calculateTotalPrice = async (userCart) => {
    let totalAmount = 0;
    for (const item of userCart.items) {
        const product = item.product;

        if (!product) {
            throw new CustomError(`Product with ID ${item.product} not found.`, 404);
        }

        if (product.countInStock < item.quantity) {
            throw new CustomError(`Product ${product._id} is out of stock.`, 400);
        }

        totalAmount += product.price * item.quantity;
    }
    return totalAmount
}

export const decreaseStock = async (userCart) => {
    for (const item of userCart.items) {
        const product = item.product;
        product.countInStock -= item.quantity;
        await product.save();
    }

}


export const findCartByUserId = async (userId) => {
    try {
        // Find the cart associated with the user
        const cart = await Cart.findOne({ user: userId }).populate('user');

        if (!cart) {
            throw new Error('Cart not found for this user.');
        }

        return cart;
    } catch (error) {
        throw new Error('Error retrieving cart: ' + error.message);
    }
};
