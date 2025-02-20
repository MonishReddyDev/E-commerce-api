import mongoose from 'mongoose';
import logger from '../utils/logger.js';
import { app, PORT } from '../server.js';

const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(url);


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
