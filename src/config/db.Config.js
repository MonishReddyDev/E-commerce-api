import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { app, PORT } from '../server.js';
import Product from '../models/product.model.js';

const url = process.env.MONGO_URI
// const products = [];

// for (let i = 1; i <= 20000; i++) {
//     products.push({
//         name: `Electric Toothbrush ${i}`,
//         description: `Rechargeable electric toothbrush ${i} with multiple cleaning modes and long-lasting battery life.`,
//         price: (Math.random() * (100 - 10) + 10).toFixed(2), // Random price between 10 and 100
//         countInStock: Math.floor(Math.random() * (500 - 100) + 100), // Random stock count between 100 and 500
//         category: "Health & Personal Care",
//         image: `https://example.com/images/toothbrush${i}.jpg`
//     });
// }

const connectDB = async () => {
    try {
        await mongoose.connect(url);

        // await Product.insertMany(products)

        logger.info('MongoDB is connected');

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

    } catch (error) {
        logger.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
