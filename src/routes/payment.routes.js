import express from 'express';
import authenticateJWT from '../middleware/auth.middleware.js';
import { payment } from '../controllers/payment.Controller.js';


const router = express.Router();

//Need to work more
router.post("/create-payment-intent", authenticateJWT, payment)



export default router;
