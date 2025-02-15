import { createProductService, deleteProductService, getAllProductsService, getProductByIdService, searchProductService, updateProductService } from "../services/product.service.js"; import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import { responseMessages } from "../utils/messages.js";
import sendSuccessResponse from "../utils/responseHandler.js"




export const createProduct = asyncErrorHandler(async (req, res) => {
    const { name, description, price, countInStock, category, image } = req.body;

    // Call the service to create the product
    const product = await createProductService(name, description, price, countInStock, category, image);

    // Success response
    sendSuccessResponse(res, 201, responseMessages.createProduct, { product });
});


// Get all products controller
export const getAllProducts = asyncErrorHandler(async (req, res) => {


    // Call the service to get all products
    const products = await getAllProductsService();

    // Send success response with products data
    sendSuccessResponse(res, 200, responseMessages.getAllProducts, {
        Total_Products: products.length,
        products
    });
});


export const getProductById = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    // Call the service to get the product
    const product = await getProductByIdService(id);

    // Send a success response
    sendSuccessResponse(res, 200, responseMessages.getProductById, { product });
});


export const updateProduct = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;
    const reqBody = req.body;

    // Call the service to update the product
    const updatedProduct = await updateProductService(id, reqBody);

    // Send success response with updated product
    sendSuccessResponse(res, 200, responseMessages.updateProduct, { product: updatedProduct });
});

export const deleteProduct = asyncErrorHandler(async (req, res) => {
    const { id } = req.params;

    // Call the service to delete the product
    const deletedProduct = await deleteProductService(id);

    // Send success response with deleted product
    sendSuccessResponse(res, 200, responseMessages.deleteProduct, { product: deletedProduct });
});



