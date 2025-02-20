import Order from "../models/order.models/order.model.js";






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




