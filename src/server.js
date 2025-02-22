import dotenv from "dotenv";
dotenv.config(); // Must be at the very top
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js'
import connectDB from "./config/db.Config.js"
import productRoute from "./routes/product.route.js"
import cartRoute from "./routes/cart.routes.js"
import orderRoute from "./routes/order.routes.js"
import globalErrorHandler from "./middleware/errorHandling.middleware.js";
import loggerMiddleware from "./middleware/logger.middleware.js";
import bodyParser from "body-parser"
import rateLimittingMiddleware from "./middleware/rateLimitter.middleware.js";
import { scheduleStockCheck } from "./cron/stockCronJob.js";
import searchRoute from "./routes/search.routes.js"
import webhookRoutes from "./routes/webhook.routes.js"
import paymentRoutes from "./routes/payment.routers.js"
import { insertBulkUsers } from "./config/db.test.js";
import feedbackRoutes from "./routes/feedBack.routes.js"
import { insertProducts } from "./config/producbulktest.js";




export const app = express();

app.use(webhookRoutes)

app.use(express.json());

app.use(rateLimittingMiddleware)
app.use(cookieParser());
app.use(bodyParser.json());

//Logger middleware
app.use(loggerMiddleware)

export const PORT = process.env.PORT || 3000;

//connect database
// insertBulkUsers();
// insertProducts();

connectDB()



//Low Stock Check 
scheduleStockCheck()


// Use auth routes
app.use('/api/auth', authRoutes);
app.use('/api/product', productRoute);
app.use("/api/cart", cartRoute)
app.use("/api/order", orderRoute)
app.use("/api", searchRoute)
app.use('/api/payment', paymentRoutes);
app.use('/api/feedback', feedbackRoutes);


app.use(globalErrorHandler);



