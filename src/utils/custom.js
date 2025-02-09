import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";



export function roundUpToTwo(number) {
    return Math.ceil(number * 100) / 100;
}

export const calculateTotalPrice = async (products) => {
    let total = 0
    for (const item of products) {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product with ID ${item.productId} not found`);

        // Multiply the current product price with the ordered quantity
        total += product.price * item.quantity;
    }
    return roundUpToTwo(total);
}

export const decreaseStock = async (products) => {
    for (const item of products) {
        await Product.findByIdAndUpdate(
            { _id: item.productId },
            { $inc: { countInStock: -item.quantity } },
            { new: true })
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