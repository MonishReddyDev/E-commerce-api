import mongoose from "mongoose"



const feedBackSchema = mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: "Product"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 0
    },
    comment: {
        type: String,
        required: true
    }


}, { timestamps: true })



const Feedback = mongoose.model('Feedback', feedBackSchema)


export default Feedback