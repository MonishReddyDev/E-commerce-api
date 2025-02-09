import Cart from "../models/cart.model.js";
import { addToCartService, getUserCartByUserIdService, removeFromCartService, updateCartService } from "../services/cart.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import sendSuccessResponse from "../utils/responseHandler.js";





// Add product to cart
export const addToCart = asyncErrorHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Call the service to add product to cart
    const cart = await addToCartService(productId, userId, quantity);


    res.status(200).json({
        message: "Product added to cart",
        cart,
    });
});

// Update product in cart
export const updateCart = asyncErrorHandler(async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    // Call the service to update cart
    const updatedCart = await updateCartService(productId, quantity, userId);

    res.status(200).json({
        message: "Cart updated successfully",
        updatedCart,
    });
});



//Todo
//Only admin 
export const getUserCart = asyncErrorHandler(async (req, res) => {
    const { userId } = req.body

    //find the cart with userid==cartid
    // Find the cart associated with the user
    const cart = await getUserCartByUserIdService(userId);


    sendSuccessResponse(res, 200, "User Cart Retrived successfully", { cart });

})

// Remove product from cart
export const removeFromCart = asyncErrorHandler(async (req, res) => {
    const { productId } = req.body;
    const userId = req.user.id;

    // Call the service to remove product from cart
    const updatedCart = await removeFromCartService(productId, userId);

    res.status(200).json({
        message: "Product removed from cart",
        updatedCart,
    });
});

