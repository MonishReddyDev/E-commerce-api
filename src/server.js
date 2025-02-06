import dotenv from "dotenv";
dotenv.config(); // Must be at the very top
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import connectDB from './config.js';
import productRoute from "./routes/product.route.js"
import cartRoute from "./routes/cart.routes.js"
import orderRoute from "./routes/order.routes.js"
import globalErrorHandler from "./middleware/errorHandling.middleware.js";
import morgan from "morgan";
import logger from "./utils/logger.js";



const app = express();
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

//connect database
connectDB()

const stream = {
    write: (message) => logger.http(message)
}
app.use(morgan(':method :url :status :response-time ms', { "stream": stream }));



// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoute);
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)


app.use(globalErrorHandler);


app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
