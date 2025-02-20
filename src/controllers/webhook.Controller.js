import stripe from "../config/stripe.config.js";
import { placeOrderService } from "../services/order.service.js";
import logger from "../utils/logger.js";


export const webhookHandler = async (req, res) => {

    logger.info("🔔 Webhook Triggered......");

    const signature = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );

        switch (event.type) {

            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;
                const userId = paymentIntent.metadata.userId

                const paymentMethod = paymentIntent.payment_method_types[0]
                const paymentStatus = paymentIntent.status
                const paymentIntentId = paymentIntent.id

                logger.info(`✅ Payment succeeded for userId: ${userId}, placing order...`);

                // **Send Response Immediately to Avoid Timeout Issues**
                res.status(200).json({ received: true })

                // **Process Order in Background**
                try {
                    await placeOrderService(userId, paymentMethod, paymentStatus, paymentIntentId);
                    logger.info("🎉 Order successfully placed");
                } catch (err) {
                    logger.error(`❌ Order placement failed: ${err.message}`);
                }
                break;
            }

            case "payment_intent.payment_failed": {
                const paymentIntent = event.data.object;
                logger.error(`❌ Payment failed for PaymentIntent: ${paymentIntent.id},Reason:${paymentIntent.last_payment_error?.message}`);
                break;
            }


            case "refund.created": {
                const paymentIntent = event.data.object;
                console.log("refund initiated for:", paymentIntent)
                break;


            }
            default:
                logger.warn(`⚠️ Unhandled event type: ${event.type}`);
        }

    } catch (error) {
        logger.error(`❌ Webhook error: ${error.message}`);
        return res.status(400).send(`Webhook Error: ${error.message}`);
    }

}

