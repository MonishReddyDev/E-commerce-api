import mongoose, { Schema } from "mongoose";

const ProdustSchema = new Schema({
    name: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        index: true
    },
    countInStock: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
    },
    category: {
        type: String,
        required: true,
        index: true
    },
    averageRating: {
        type: Number,
        default: 0
    },
    totalRatings: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
})




const Product = mongoose.model("Product", ProdustSchema)


export default Product