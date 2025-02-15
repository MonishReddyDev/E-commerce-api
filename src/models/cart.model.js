
import mongoose, { Schema } from "mongoose";


const cartItemSchema = Schema({
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "Product",
        required: true
    },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
}, { _id: false })


const cartSchema = Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    items: [cartItemSchema], // Array of cart items
},
    { timestamps: true }
)

//TTL index to auto-delete the Cart after 7 days
cartSchema.index({ createdAt: 1 }, { expireAfterSeconds: 7 * 24 * 60 * 60 })

const Cart = mongoose.model("Cart", cartSchema)


export default Cart