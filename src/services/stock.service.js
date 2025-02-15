import Product from "../models/product.model.js";
import { ERROR_MESSAGES } from "../utils/messages.js";


export const lowStockAlert = async () => {
    const lowStockProducts = await Product.find({ countInStock: { $lt: 50 } }).select("name countInStock _id category");
    if (!lowStockProducts || lowStockProducts.length === 0) {
        throw new Error(ERROR_MESSAGES.LOW_STOCK);
    }
    return lowStockProducts;
};
