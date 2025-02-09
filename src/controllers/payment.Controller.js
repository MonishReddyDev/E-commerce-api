import asyncHandler from "../utils/asyncErrorHandler.js";
import Stripe from "../utils/stripe.js";

export const payment = asyncHandler(async (req, res) => {
    const { amount, currency } = req.body;

    // Create a PaymentIntent with the given amount and currency
    const paymentIntent = await Stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
            enabled: true,
            allow_redirects: "never", // Avoid redirects for simple payments
        },
    });



    // Send client secret to frontend for completing payment
    res.status(201).json({
        clientSecret: paymentIntent.client_secret,
    });
});


