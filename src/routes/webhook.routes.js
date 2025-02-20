import express from 'express';
import { webhookHandler } from "../controllers/webhook.Controller.js"

const router = express.Router();

// The raw body parser is required for webhook verification
//create the order after pament
router.post('/webhook', express.raw({ type: 'application/json' }), webhookHandler);

export default router;
