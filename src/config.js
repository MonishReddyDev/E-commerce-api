import mongoose from 'mongoose';
import logger from './utils/logger.js';
import { app, PORT } from './server.js';
import Product from './models/product.model.js';

const products = [
    {
        "name": "Electric Toothbrush",
        "description": "Rechargeable electric toothbrush with multiple cleaning modes and long-lasting battery life.",
        "price": 39.99,
        "countInStock": 300,
        "category": "Health & Personal Care",
        "image": "https://example.com/images/toothbrush.jpg"
    },
    {
        "name": "Noise-Cancelling Headphones",
        "description": "Wireless over-ear headphones with active noise cancellation for immersive audio.",
        "price": 199.99,
        "countInStock": 150,
        "category": "Electronics",
        "image": "https://example.com/images/headphones.jpg"
    },
    {
        "name": "Smartwatch",
        "description": "Fitness tracker and smartwatch with heart rate monitor, sleep tracking, and smartphone notifications.",
        "price": 149.99,
        "countInStock": 200,
        "category": "Electronics",
        "image": "https://example.com/images/smartwatch.jpg"
    },
    {
        "name": "Portable Bluetooth Speaker",
        "description": "Water-resistant Bluetooth speaker with powerful sound and compact design.",
        "price": 49.99,
        "countInStock": 400,
        "category": "Electronics",
        "image": "https://example.com/images/speaker.jpg"
    },
    {
        "name": "Espresso Machine",
        "description": "Semi-automatic espresso machine with milk frother for barista-quality coffee at home.",
        "price": 399.99,
        "countInStock": 50,
        "category": "Kitchen Appliances",
        "image": "https://example.com/images/espresso.jpg"
    },
    {
        "name": "Air Fryer",
        "description": "Digital air fryer with adjustable temperature and timer for healthy cooking.",
        "price": 99.99,
        "countInStock": 100,
        "category": "Kitchen Appliances",
        "image": "https://example.com/images/airfryer.jpg"
    },
    {
        "name": "Robot Vacuum",
        "description": "Smart robot vacuum with mapping technology and app control for effortless cleaning.",
        "price": 299.99,
        "countInStock": 75,
        "category": "Home Appliances",
        "image": "https://example.com/images/robotvacuum.jpg"
    },
    {
        "name": "Gaming Keyboard",
        "description": "Mechanical gaming keyboard with RGB backlighting and customizable macros.",
        "price": 129.99,
        "countInStock": 120,
        "category": "Gaming",
        "image": "https://example.com/images/keyboard.jpg"
    },
    {
        "name": "Gaming Mouse",
        "description": "High-precision gaming mouse with adjustable DPI and programmable buttons.",
        "price": 79.99,
        "countInStock": 180,
        "category": "Gaming",
        "image": "https://example.com/images/mouse.jpg"
    },
    {
        "name": "Yoga Mat",
        "description": "Non-slip yoga mat with thick cushioning for comfortable workouts.",
        "price": 24.99,
        "countInStock": 250,
        "category": "Sports & Outdoors",
        "image": "https://example.com/images/yogamat.jpg"
    },
    {
        "name": "Camping Tent",
        "description": "Waterproof camping tent with spacious interior and easy setup.",
        "price": 149.99,
        "countInStock": 60,
        "category": "Sports & Outdoors",
        "image": "https://example.com/images/tent.jpg"
    },
    {
        "name": "Backpack",
        "description": "Durable backpack with multiple compartments and padded laptop sleeve.",
        "price": 59.99,
        "countInStock": 300,
        "category": "Bags & Luggage",
        "image": "https://example.com/images/backpack.jpg"
    },
    {
        "name": "Leather Wallet",
        "description": "Genuine leather wallet with RFID blocking and multiple card slots.",
        "price": 49.99,
        "countInStock": 100,
        "category": "Men's Accessories",
        "image": "https://example.com/images/wallet.jpg"
    },
    {
        "name": "Sunglasses",
        "description": "Polarized sunglasses with UV protection and stylish design.",
        "price": 79.99,
        "countInStock": 200,
        "category": "Fashion Accessories",
        "image": "https://example.com/images/sunglasses.jpg"
    },
    {
        "name": "Digital Camera",
        "description": "Mirrorless digital camera with interchangeable lenses and 4K video recording.",
        "price": 799.99,
        "countInStock": 40,
        "category": "Electronics",
        "image": "https://example.com/images/camera.jpg"
    },
    {
        "name": "Wireless Mouse",
        "description": "Ergonomic wireless mouse with long battery life and precise tracking.",
        "price": 29.99,
        "countInStock": 350,
        "category": "Electronics",
        "image": "https://example.com/images/wirelessmouse.jpg"
    },
    {
        "name": "Book: The Lord of the Rings",
        "description": "Fantasy novel by J.R.R. Tolkien.",
        "price": 29.99,
        "countInStock": 500,
        "category": "Books",
        "image": "https://example.com/images/lotr.jpg"
    },
    {
        "name": "Board Game: Settlers of Catan",
        "description": "Strategy board game for 3-4 players.",
        "price": 49.99,
        "countInStock": 150,
        "category": "Games",
        "image": "https://example.com/images/catan.jpg"
    },
    {
        "name": "Coffee Beans",
        "description": "1kg bag of premium Arabica coffee beans.",
        "price": 19.99,
        "countInStock": 200,
        "category": "Groceries",
        "image": "https://example.com/images/coffeebeans.jpg"
    },
    {
        "name": "Teapot",
        "description": "Glass teapot with stainless steel infuser.",
        "price": 24.99,
        "countInStock": 100,
        "category": "Kitchenware",
        "image": "https://example.com/images/teapot.jpg"
    }
]

const url = process.env.MONGO_URI

const connectDB = async () => {
    try {
        await mongoose.connect(url);


        logger.info('MongoDB is connected');

        const result = await Product.insertMany(products);

        app.listen(PORT, () => {
            logger.info(`Server running on port ${PORT}`);
        });

    } catch (error) {
        logger.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
