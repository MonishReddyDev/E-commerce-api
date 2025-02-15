import { searchProductService } from "../services/product.service.js"
import asyncErrorHandler from "../utils/asyncErrorHandler.js"
import sendSuccessResponse from "../utils/responseHandler.js"



export const searchProduct = asyncErrorHandler(async (req, res) => {

    // 1. Get query parameters with defaults
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ""
    const sortField = req.query.sortField || 'price'
    const sortOrder = req.query.sortOrder || 'asc';

    const { products, total } = await searchProductService(page, limit, searchQuery, sortField, sortOrder)


    const result = {
        products,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        Total_Products: total
    }

    sendSuccessResponse(res, 200, "Product Fetched SuccessFull", result)
})
