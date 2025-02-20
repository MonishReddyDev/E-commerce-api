
import mongoose from "mongoose";
import { orderItemSchema } from "./order.model.js";

const canceledOrderSchema = mongoose.Schema({
    originalOrderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Order"
    },
    userId: {
        type: mongoose.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    items: [orderItemSchema],
    totalAmount: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ["pending", "succeeded", "failed", "refunded"],
        default: "pending",
    },
    paymentIntentId: {
        type: String, // Stripe Payment Intent ID
    },
    refundStatus: {
        type: String,
        enum: ["none", "pending", "succeeded", "failed"],
        default: "none",
    },
    refundId: {
        type: String, // Stripe Refund ID (if applicable)
    },
    canceledAt: {
        type: Date,
        default: Date.now, // Timestamp when the order was canceled
    },
    reasonForCancellation: {
        type: String, // Optional
    },


})


const CanceledOrder = mongoose.model("CanceledOrder", canceledOrderSchema)

export default CanceledOrder