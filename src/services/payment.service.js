import Cart from "../models/cart.model.js";
import stripe from "../config/stripe.config.js"
import { CustomError } from "../utils/customeError.js"


export const createPaymentService = async (userId) => {

    const cart = await Cart.findOne({ user: userId }).populate('items')

    //if not cart pr no prodicts return empty cart
    if (!cart || cart.items.length === 0) {
        throw new CustomError("Cart is empty ", 400)
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
            userId: userId
        },
        payment_method_types: ["card"],

    })

    if (!paymentIntent) throw new CustomError("PaymentIntent not found ", 400)

    return paymentIntent

}



export const confirmPaymentService = async (paymentIntentId) => {

    if (!paymentIntentId) throw new CustomError("paymentIntentId not found ", 404)

    /** Confirm the payment intent with test card
     * payment_method: 'pm_card_visa_chargeDeclined'
     */
    const paymentIntent = await stripe.paymentIntents.confirm(paymentIntentId, {
        payment_method: 'pm_card_visa',
    })

    if (!paymentIntent) throw new CustomError("paymentIntent not found ", 404)

    return paymentIntent

}