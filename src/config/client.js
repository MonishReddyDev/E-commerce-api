import { Redis } from "ioredis";

// Create a Redis client
const client = new Redis({
    host: "localhost",
    port: 6379,
});


// Handle connection errors
client.on("connect", () => {
    console.log("Connected to Redis");
});

client.on("error", (err) => {
    console.error("Redis connection error:", err);
});






// Export the client for reuse
export default client;
