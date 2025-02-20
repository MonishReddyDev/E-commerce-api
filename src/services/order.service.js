import Order from "../models/order.models/order.model.js"
import { calculateTotalPrice, decreaseStock } from "../utils/custom.js";
import { CustomError } from "../utils/customeError.js";
import { ERROR_MESSAGES } from "../utils/messages.js";
import { getUserCart, clearCart, createOrder, validateCart } from "../utils/helper.js"
import stripe from "../config/stripe.config.js"
import CancelOrder from "../models/order.models/canceledOrder.model.js"


export const placeOrderService = async (userId, paymentMethod, paymentStatus, paymentIntentId) => {

    // Fetch Cart Details
    const userCart = await getUserCart(userId)

    //Validate Cart
    validateCart(userCart)

    let totalAmount = await calculateTotalPrice(userCart)
    totalAmount = (totalAmount * 100) / 100


    //decreaseStock
    await decreaseStock(userCart)

    //Create the order
    const order = await createOrder(userId, userCart, totalAmount, paymentMethod, paymentStatus, paymentIntentId)

    // Clear the cart 
    await clearCart(userId)

    return order

};


export const cancelOrderService = async (req, res) => {

    try {
        const { orderId } = req.body

        // Step 1: Retrieve the order
        const order = await Order.findById(orderId).select('userId orderStatus paymentStatus paymentIntentId totalAmount items');

        if (!order) return res.status(404).json({ error: "Order not found" })

        // Ensure only the order owner can cancel
        if (String(order.userId) !== req.user.id) {
            return res.status(403).json({ error: "Unauthorized to cancel this order" });
        }

        // Check if order is cancelable
        // if (order.orderStatus === "shipped" || order.orderStatus === 'delivered')
        //     return res.status(400).json(`The order is already ${order.orderStatus} you can not cancel the order`)

        if (["shipped", "delivered"].includes(order.orderStatus)) {
            return res.status(400).json({
                error: `The order is already ${order.orderStatus}. Cannot cancel the order.`
            });
        }

        // Step 4: Create a canceled order record
        const cancelOrderData = {
            originalOrderId: order.id,
            userId: order.userId,
            items: order.items,
            totalAmount: order.totalAmount,
            paymentStatus: order.paymentStatus,
            paymentIntentId: order.paymentIntentId,
            refundStatus: "none", //non for now will update after the refund created
            canceledAt: Date.now(),
        }

        // Step 4: Parallel processing for better performance
        const [cancelOrder] = await Promise.all([
            CancelOrder.create(cancelOrderData),
            Order.findByIdAndDelete(orderId)
        ])

        // Step 4: Check if a refund is needed
        if (order.paymentStatus === "succeeded") {
            try {
                // Retrieve the Payment Intent to get the charge ID
                const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntentId)

                // Create the refund
                const refund = await stripe.refunds.create({
                    charge: paymentIntent.latest_charge,
                    amount: Math.round(order.totalAmount * 100)
                }, {
                    idempotencyKey: `${orderId}_refund`
                });

                // Update refund details
                // Update refund details
                cancelOrder.refundStatus = refund.status;
                cancelOrder.refundId = refund.id;
                await cancelOrder.save();


                return res.status(200).json({
                    success: true,
                    message: "Order successfully canceled and refund initiated.",
                    refundDetails: refund
                });


            } catch (refundError) {
                // Log refund error for monitoring
                console.error("Refund processing error:", refundError);

                return res.status(500).json({
                    success: false,
                    error: "Order canceled, but refund failed. Please contact support.",
                    orderDetails: cancelOrder
                });

            }

        }

        return res.status(200).json({
            success: true,
            message: "Order successfully canceled.",
            orderDetails: cancelOrder
        });

    } catch (error) {
        console.error("Error in cancelOrderService:", error);
        return res.status(500).json({
            success: false,
            error: "An error occurred while processing your request."
        });

    }

}


// Get all orders for a user
export const getAnyUserOrdersService = async (userId) => {

    const orders = await Order.find({ userId });
    if (!orders || orders.length === 0) {
        throw new CustomError(ERROR_MESSAGES.NO_ORDERS_FOUND, 404);
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
        throw new CustomError(ERROR_MESSAGES.NO_ORDERS_FOUND, 404);
    }

    return { updatedOrder };
};
