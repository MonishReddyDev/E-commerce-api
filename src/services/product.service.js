
import Product from "../models/product.model.js"
import { CustomError } from "../utils/CustomeError.js"
import { ERROR_MESSAGES } from "../utils/messages.js";



export const createProductService = async (name, description, price, countInStock, category, image) => {

    // Check if the product name already exists
    const productWithSameNameExist = await Product.findOne({ name });

    //if the Product name is alredy in db
    if (productWithSameNameExist) {
        throw new CustomError(ERROR_MESSAGES.PRODUCT_NAME_DUBLICATE, 400);
    }

    if (!productWithSameNameExist) {
        // Create and save the product
        const product = new Product({
            name,
            description,
            price,
            countInStock,
            category,
            image,
        });

        await product.save();
        return product;
    }



};

export const getProductByIdService = async (id) => {

    const product = await Product.findById(id)

    if (!product) throw new CustomError(ERROR_MESSAGES.PRODUCT_NOTFOUND, 400);

    return product

}

export const getAllProductsService = async () => {
    // Fetch all products from the database
    const products = await Product.find();
    return products; // Return the fetched products
};

export const updateProductService = async (id, reqBody) => {

    // Find and update the product by ID
    const updatedProduct = await Product.findByIdAndUpdate(id, reqBody, { new: true });

    if (!updatedProduct) {
        // Throw a custom error if the product is not found
        throw new CustomError(ERROR_MESSAGES.PRODUCT_NOTFOUND, 400);
    }

    return updatedProduct; // Return the updated product
};

export const deleteProductService = async (id) => {
    // Find and delete the product by ID
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
        // Throw a custom error if the product is not found
        throw new CustomError(ERROR_MESSAGES.PRODUCT_NOTFOUND, 400);
    }

    return deletedProduct; // Return the deleted product
};