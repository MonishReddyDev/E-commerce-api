import express from 'express';
import stripe from 'stripe';
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);



export const createPaymentIntent = async (req, res) => {
    try {

        const { amount, currency } = req.body

        if (!amount || !currency) {
            return res.status(400).json({ error: 'Invalid amount' });
        }

        // Create payment intent
        const paymentIntent = await stripeClient.paymentIntents.create({
            amount: Math.round(amount * 100),
            currency,


        })

        res.json({
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id
        })
    } catch (error) {
        console.error('Payment Intent Error:', error);
        res.status(500).json({ error: error.message });
    }
}