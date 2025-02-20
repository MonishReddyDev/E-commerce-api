import stripe from "../config/stripe.config.js";
import { handlePaymentIntentPaymentFailed, handlePaymentIntentSucceeded, handleRefundCreated, processOrderInBackground } from "../helpers/webhook.Helpers.js";
import logger from "../utils/logger.js";


export const webhookHandler =
    async (req, res) => {

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
                    const orderData = await handlePaymentIntentSucceeded(paymentIntent, res)
                    processOrderInBackground(orderData)
                    break;
                }

                case "payment_intent.payment_failed": {
                    const paymentIntent = event.data.object;
                    await handlePaymentIntentPaymentFailed(paymentIntent)
                    break;
                }


                case "refund.created": {
                    const paymentIntent = event.data.object;
                    await handleRefundCreated(paymentIntent)
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


