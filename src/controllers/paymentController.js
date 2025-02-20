import stripe from "../config/stripe.config.js";
import Cart from "../models/cart.model.js"


// 1. Create payment intent when checking out cart
export const createPaymentIntent = async (req, res) => {
    try {
        //find the cart 
        const cart = await Cart.findOne({ user: req.user.id }).populate('items')

        //if not cart pr no prodicts return empty cart
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        let totalAmount = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        totalAmount = (totalAmount * 100) / 100

        //createPaymentIntent
        const paymentIntent = await stripe.paymentIntents.create({
            amount: totalAmount * 100, // convert to cents
            currency: "USD",
            metadata: {
                cartId: cart._id.toString(),
                userId: req.user.id
            },
            payment_method_types: ["card"],

        })

        if (paymentIntent.metadata.userId) {
            res.json({
                clientSecret: paymentIntent.client_secret,
                paymentIntentId: paymentIntent.id,
                amount: totalAmount
            });
        }

    } catch (error) {
        console.error('Payment intent creation error:', error);
        res.status(500).json({ error: error.message });
    }
}

// 2. Confirm payment (for testing in Postman)
export const confirmPayment = async (req, res) => {
    try {


        const { paymentIntentId } = req.body

        // Confirm the payment intent with test card
        // payment_method: 'pm_card_visa_chargeDeclined', // Test card payment method
        const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
            payment_method: 'pm_card_visa', // Test card payment method
        })

        res.json({ status: paymentIntent.status, paymentIntent });

    } catch (error) {
        console.error('Payment confirmation error:', error);
        res.status(500).json({ error: error.message });
    }

}



