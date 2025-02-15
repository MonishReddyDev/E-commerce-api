import Product from "../models/product.model.js";


export const lowStockAlert = async () => {
    const lowStockProducts = await Product.find({ countInStock: { $lt: 50 } }).select("name countInStock _id category");
    if (!lowStockProducts || lowStockProducts.length === 0) {
        throw new Error("No low stock products found");
    }
    return lowStockProducts;
};
