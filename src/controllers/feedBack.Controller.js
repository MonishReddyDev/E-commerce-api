import asyncErrorHandler from "../utils/globalHandlers/asyncErrorHandler.js";
import Feedback from "../models/feedback.js";
import Product from "../models/product.model.js";
import { submitFeedbackService } from "../services/feedBack.service.js";
import sendSuccessResponse from "../utils/globalHandlers/responseHandler.js"

export const submitFeedback = asyncErrorHandler(async (req, res) => {
    const userId = req.user.id;
    const { productId, rating, comment } = req.body;

    const feedback = await submitFeedbackService(productId, rating, comment, userId)

    sendSuccessResponse(res, 201, "Feedback submitted successfully", feedback)

});
