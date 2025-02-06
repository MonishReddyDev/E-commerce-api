import mongoose, { Schema } from "mongoose";

const ProdustSchema = new Schema({

    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
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
        required: true
    }
}, {
    timestamps: true
})


const Product = mongoose.model("Product", ProdustSchema)


export default Product