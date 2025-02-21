import redisclient from "../config/redis.config.js"
import { searchProductService } from "../services/product.service.js"
import asyncErrorHandler from '../utils/globalHandlers/asyncErrorHandler.js';
import { SEARCH_MESSAGES } from "../utils/messages.js"
import sendSuccessResponse from "../utils/globalHandlers/responseHandler.js"




export const searchProduct = asyncErrorHandler(async (req, res) => {

    // 1. Get query parameters with defaults
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const searchQuery = req.query.search || ""
    const sortField = req.query.sortField || 'price'
    const sortOrder = req.query.sortOrder || 'asc';


    //create the key
    const cacheKey = `search=${searchQuery}&sortField=${sortField}&sortOrder=${sortOrder}&page=${page}&limit=${limit}`

    //Get the cache data after true condition
    const currentCache = await redisclient.get(cacheKey)

    if (currentCache) {
        return sendSuccessResponse(res, 200, SEARCH_MESSAGES.SUCCESS, JSON.parse(currentCache))
    }

    const result = await searchProductService(page, limit, searchQuery, sortField, sortOrder)

    //set the cache 
    await redisclient.setex(cacheKey, 120, JSON.stringify(result))


    return sendSuccessResponse(res, 200, SEARCH_MESSAGES.SUCCESS, result)

})
