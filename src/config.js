import mongoose from 'mongoose';
import logger from './utils/logger.js';
import { app, PORT } from './server.js';
import Product from './models/product.model.js';

const products = [
    {
        "name": "Electric Toothbrush",
        "description": "Rechargeable electric toothbrush with multiple cleaning modes and long-lasting battery life.",
        "price": 39.99,
        "countInStock": 0,
        "image": "https://example.com/images/toothbrush.jpg",
        "category": "Health & Personal Care"
    },
    {
        "name": "Bluetooth Headphones",
        "description": "Over-ear Bluetooth headphones with noise-canceling and a built-in microphone for calls.",
        "price": 89.99,
        "countInStock": 25,
        "image": "https://example.com/images/headphones.jpg",
        "category": "Electronics"
    },
    {
        "name": "Yoga Mat",
        "description": "Non-slip, eco-friendly yoga mat for a comfortable practice.",
        "price": 19.99,
        "countInStock": 50,
        "image": "https://example.com/images/yoga-mat.jpg",
        "category": "Sports & Outdoors"
    },
    {
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse with adjustable DPI settings and smooth tracking.",
        "price": 29.99,
        "countInStock": 100,
        "image": "https://example.com/images/wireless-mouse.jpg",
        "category": "Computers & Accessories"
    },
    {
        "name": "Smartphone Case",
        "description": "Slim, shockproof smartphone case available in various colors for iPhone and Android.",
        "price": 15.99,
        "countInStock": 200,
        "image": "https://example.com/images/smartphone-case.jpg",
        "category": "Mobile Accessories"
    },
    {
        "name": "Instant Camera",
        "description": "Instant print camera with multiple color filters and built-in flash.",
        "price": 129.99,
        "countInStock": 30,
        "image": "https://example.com/images/instant-camera.jpg",
        "category": "Electronics"
    },
    {
        "name": "Coffee Maker",
        "description": "Programmable coffee maker with a built-in grinder for fresh brews.",
        "price": 59.99,
        "countInStock": 75,
        "image": "https://example.com/images/coffee-maker.jpg",
        "category": "Home Appliances"
    },
    {
        "name": "Smart Watch",
        "description": "Fitness tracking smart watch with heart rate monitoring and sleep analysis.",
        "price": 99.99,
        "countInStock": 45,
        "image": "https://example.com/images/smartwatch.jpg",
        "category": "Wearable Tech"
    },
    {
        "name": "Electric Kettle",
        "description": "Fast-boiling electric kettle with temperature control and auto shut-off.",
        "price": 39.99,
        "countInStock": 60,
        "image": "https://example.com/images/electric-kettle.jpg",
        "category": "Home Appliances"
    },
    {
        "name": "Gaming Chair",
        "description": "Ergonomic gaming chair with adjustable armrests and lumbar support.",
        "price": 179.99,
        "countInStock": 20,
        "image": "https://example.com/images/gaming-chair.jpg",
        "category": "Furniture"
    },
    {
        "name": "Tennis Racket",
        "description": "Lightweight tennis racket with carbon fiber frame for better durability.",
        "price": 59.99,
        "countInStock": 15,
        "image": "https://example.com/images/tennis-racket.jpg",
        "category": "Sports & Outdoors"
    },
    {
        "name": "Smart LED TV",
        "description": "65-inch 4K Smart LED TV with built-in streaming apps and HDR support.",
        "price": 699.99,
        "countInStock": 10,
        "image": "https://example.com/images/smart-tv.jpg",
        "category": "Electronics"
    },
    {
        "name": "Leather Wallet",
        "description": "Genuine leather wallet with multiple compartments for cards and cash.",
        "price": 29.99,
        "countInStock": 120,
        "image": "https://example.com/images/leather-wallet.jpg",
        "category": "Fashion"
    },
    {
        "name": "LED Desk Lamp",
        "description": "Adjustable LED desk lamp with touch control and brightness settings.",
        "price": 39.99,
        "countInStock": 50,
        "image": "https://example.com/images/led-lamp.jpg",
        "category": "Home & Office"
    },
    {
        "name": "Cork Yoga Blocks",
        "description": "Set of two eco-friendly cork yoga blocks for support and alignment.",
        "price": 25.99,
        "countInStock": 80,
        "image": "https://example.com/images/yoga-blocks.jpg",
        "category": "Sports & Outdoors"
    },
    {
        "name": "Camping Tent",
        "description": "Two-person tent with waterproof fabric and easy setup design.",
        "price": 89.99,
        "countInStock": 40,
        "image": "https://example.com/images/camping-tent.jpg",
        "category": "Sports & Outdoors"
    },
    {
        "name": "Robot Vacuum",
        "description": "Smart robot vacuum with app control and self-charging feature.",
        "price": 199.99,
        "countInStock": 30,
        "image": "https://example.com/images/robot-vacuum.jpg",
        "category": "Home Appliances"
    },
    {
        "name": "Blender",
        "description": "High-speed blender with multiple blending options for smoothies and soups.",
        "price": 49.99,
        "countInStock": 100,
        "image": "https://example.com/images/blender.jpg",
        "category": "Home Appliances"
    }
]


const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(url);


        logger.info('MongoDB is connected');

        // const result = await Product.insertMany(products);

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

    } catch (error) {
        logger.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
