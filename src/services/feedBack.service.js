import Feedback from "../models/feedback.js";
import Product from "../models/product.model.js";
import { CustomError } from "../utils/globalHandlers/customeError.js";



export const submitFeedbackService = async (productId, rating, comment, userId) => {

    const product = await Product.findById(productId)

    if (!product) {
        throw new CustomError("Product not found", 404);
    }

    //get existingFeedBack and returnold rating if any

    const existingFeedBack = await Feedback.findOne({ userId, productId })
    const oldRating = existingFeedBack ? existingFeedBack.rating : null


    //UpsertFeedback
    const feedback = await Feedback.findOneAndUpdate(
        { userId, productId },
        { rating, comment, createdAt: new Date() },
        { upsert: true, new: true, runValidators: true })


    // Calculate new average rating and total ratings inline
    const currentScore = product.averageRating * product.totalRatings;
    const newTotalRatings = oldRating !== null ? product.totalRatings : product.totalRatings + 1
    const newAverageRating = oldRating !== null
        ? (currentScore - oldRating + rating) / product.totalRatings  // Update case
        : (currentScore + rating) / newTotalRatings;

    // Update product
    const updatedProduct = await Product.findByIdAndUpdate(productId, {
        averageRating: newAverageRating,
        totalRatings: newTotalRatings
    }, { new: true, runValidators: true }
    )

    // Prepare response with rounded averageRating


    return feedback

}

