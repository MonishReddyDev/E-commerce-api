
import mongoose from "mongoose";



const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref: "User", required: true },
    products: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            quantity: { type: Number, required: true },
        }
    ],
    idempotencyKey: { type: String, required: true },
    totalAmount: { type: String },
    status: { type: String, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    orderDate: { type: Date, default: Date.now },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' }
})

const Order = mongoose.model("Order", orderSchema)


export default Order