import Product from "../models/product.model.js";

const categories = [
    "Health & Personal Care",
    "Electronics",
    "Home & Kitchen",
    "Beauty",
    "Sports & Outdoors"
];

// Function to generate a random product name
const getRandomProductName = (index) => {
    const adjectives = ["Electric", "Rechargeable", "Smart", "Portable", "Wireless"];
    const items = ["Toothbrush", "Shaver", "Blender", "Vacuum", "Speaker"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const randomItem = items[Math.floor(Math.random() * items.length)];
    return `${randomAdjective} ${randomItem} ${index}`;
};

const getRandomPrice = () => (Math.random() * (100 - 5) + 5).toFixed(2); // Random price between $5.00 and $100.00
const getRandomStock = () => Math.floor(Math.random() * 500) + 1; // Random stock count between 1 and 500
const getRandomRating = () => Math.floor(Math.random() * 6); // Random rating between 0 and 5

export const insertProducts = async () => {
    const products = [];

    for (let i = 1; i <= 40000; i++) {
        const category = categories[Math.floor(Math.random() * categories.length)]; // Random category

        products.push({
            name: getRandomProductName(i), // Random name
            description: "Rechargeable electric toothbrush with multiple cleaning modes and long-lasting battery life.",
            price: parseFloat(getRandomPrice()), // Random price
            countInStock: getRandomStock(), // Random stock count
            category: category, // Random category
            image: "https://example.com/images/toothbrush.jpg",
            averageRating: getRandomRating(), // Random rating
            totalRatings: Math.floor(Math.random() * 200) + 1 // Random total ratings between 1 and 200
        });
    }

    try {
        await Product.insertMany(products);
        console.log("Inserted 40,000 products successfully");
    } catch (error) {
        console.error("Error inserting products:", error);
    }
};

// Call the function to insert products

