import { confirmPaymentService, createPaymentService } from "../services/payment.service.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import sendSuccessResponse from "../utils/responseHandler.js"



// 1. Create payment intent when checking out cart
export const createPaymentIntent = asyncErrorHandler(
    async (req, res) => {
        const userId = req.user.id

        const paymentIntent = await createPaymentService(userId)
        const response = {
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount
        }

        sendSuccessResponse(res, 200, "Payment intiated Successfully", { response })
    }
)



// 2. Confirm payment (for testing in Postman)
export const confirmPayment = asyncErrorHandler(async (req, res) => {

    const { paymentIntentId } = req.body

    const confirmPaymentIntent = await confirmPaymentService(paymentIntentId)

    const response = { status: confirmPaymentIntent.status, confirmPaymentIntent }

    sendSuccessResponse(res, 200, "Successfully Payment confirmed", { response })

})



