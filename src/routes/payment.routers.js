import express from 'express'
import { confirmPayment, createPaymentIntent } from '../controllers/paymentController.js';
import authenticateJWT from "../middleware/auth.middleware.js"

const router = express.Router()


// paymentRoutes.js
router.post('/create-intent', authenticateJWT, createPaymentIntent);
router.post('/confirm-payment', authenticateJWT, confirmPayment);

export default router