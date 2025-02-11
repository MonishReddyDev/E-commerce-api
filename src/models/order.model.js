// orderModel.js
import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
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
        username: {
            type: String,
            required: true,
        },
        products: [orderItemSchema],  // Array of products in the order
        totalAmount: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ['pending', 'completed', 'shipped', 'cancelled'],
            default: 'pending',
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        updatedAt: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }  // Automatically adds createdAt and updatedAt fields
);

const Order = mongoose.model('Order', orderSchema);

export default Order;
