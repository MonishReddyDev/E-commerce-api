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
import loggerMiddleware from "./middleware/logger.middleware.js";
import paymentRoute from "./routes/payment.routes.js"
import bodyParser from "body-parser"


export const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());

//Logger middleware
app.use(loggerMiddleware)

export const PORT = process.env.PORT || 3000;

//connect database
connectDB()



// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoute);
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/api", paymentRoute)



app.use(globalErrorHandler);
