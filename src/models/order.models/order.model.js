// orderModel.js
import mongoose from 'mongoose';

export const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
    },
    price: {
        type: Number,
        required: true,
    },
}, { _id: false });  // We don't need an _id for each item

const orderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        items: [orderItemSchema],  // Array of products in the order
        totalAmount: {
            type: Number,
            required: true,
        },
        shippingAddress: {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String,
        },
        orderStatus: {
            type: String,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        paymentStatus: {
            type: String,
            enum: ["pending", "succeeded", "failed", "refunded"],
            default: "pending",
        },
        paymentMethod: {
            type: String,
            enum: ['credit_card', 'paypal', 'bank_transfer', 'cash_on_delivery', 'card'],
            required: true,
            default: "credit_card"
        },
        paymentIntentId: {
            type: String,
            unique: true
        }

    },
    { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
