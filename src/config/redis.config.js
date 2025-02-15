import { Redis } from "ioredis";
import logger from "../utils/logger.js";

// Create a Redis client
const redisclient = new Redis({
    host: "localhost",
    port: 6379,
});


// Handle connection errors
redisclient.on("connect", () => {
    logger.info("Connected to Redis");
});

redisclient.on("error", (err) => {
    logger.error("Redis connection error:", err);
});






// Export the client for reuse
export default redisclient;
