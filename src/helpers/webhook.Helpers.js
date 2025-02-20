

import { placeOrderService } from "../services/order.service.js"
import logger from "../utils/logger.js"


export const handlePaymentIntentSucceeded = async (paymentIntent, res, next) => {

    const userId = paymentIntent.metadata.userId

    const paymentMethod = paymentIntent.payment_method_types[0]
    const paymentStatus = paymentIntent.status
    const paymentIntentId = paymentIntent.id

    logger.info(`✅ Payment succeeded for userId: ${userId}, placing order...`);

    res.status(200).json({ received: true })

    // Return data for background processing
    return {
        userId,
        paymentMethod,
        paymentStatus,
        paymentIntentId
    };
}


export const processOrderInBackground = async (orderData) => {

    const { userId, paymentMethod, paymentStatus, paymentIntentId } = orderData;

    await placeOrderService(userId, paymentMethod, paymentStatus, paymentIntentId);

    logger.info("🎉 Order successfully placed");
}

export async function handlePaymentIntentPaymentFailed(paymentIntent) {
    logger.error(`❌ Payment failed for PaymentIntent: ${paymentIntent.id},Reason:${paymentIntent.last_payment_error?.message}`);

}

export async function handleRefundCreated(paymentIntent) {
    console.log("refund initiated for:", paymentIntent)
}
