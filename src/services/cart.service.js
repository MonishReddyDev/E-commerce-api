import Product from "../models/product.model.js"
import Cart from "../models/cart.model.js"
import { CustomError } from "../utils/customeError.js"

// Add product to cart
export const addToCartService = async (productId, userId, quantity) => {
    const product = await Product.findById(productId);
    if (!product) {
        throw new CustomError("Product Not Found", 404);
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({
            user: userId,
            items: [],
        });
    }

    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (productIndex > -1) {
        cart.items[productIndex].quantity += quantity;
        cart.items[productIndex].price = product.price * cart.items[productIndex].quantity;
    } else {
        cart.items.push({
            product: productId,
            quantity,
            price: product.price,
        });
    }

    await cart.save();
    return cart;
};

// Update product from cart
export const updateCartService = async (productId, quantity, userId) => {
    if (quantity <= 0) {
        throw new CustomError("Quantity must be a positive number", 400);
    }

    const product = await Product.findById(productId);
    if (!product) {
        throw new CustomError("Product not found", 404);
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new CustomError("Cart not found", 404);
    }

    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (productIndex === -1) {
        throw new CustomError("Product not found in the Cart", 404);
    }

    cart.items[productIndex].quantity += quantity;
    cart.items[productIndex].price = product.price * cart.items[productIndex].quantity;

    await cart.save();
    return cart;
};

// Remove product from cart
export const removeFromCartService = async (productId, userId) => {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
        throw new CustomError("Cart not found", 404);
    }

    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);
    if (productIndex === -1) {
        throw new CustomError("Product not found in the Cart", 404);
    }

    cart.items.pull({ product: productId });
    await cart.save();

    const updatedCart = await Cart.findOne({ user: userId });
    return updatedCart;
};

//getUserCart

export const getUserCartByUserIdService = async (userId) => {

    const cart = await Cart.findOne({ user: userId }).populate('user', 'email');

    if (!cart) {
        throw new Error('Cart not found for this user.');
    }

    return cart;
}
