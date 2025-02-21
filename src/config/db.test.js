import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from '../models/user.model.js'; // Adjust the path as needed

const MONGO_URI = "mongodb://localhost:27017/EcommerceDB"; // Change to your DB connection string

const generateUsers = async (count) => {
    const users = [];
    const salt = await bcrypt.genSalt(10); // Generate salt once for performance optimization

    for (let i = 0; i < count; i++) {
        const hashedPassword = await bcrypt.hash("Test@1234", salt);
        users.push({
            username: `userg${i}`,
            email: `userg${i}@gmail.com`,
            password: hashedPassword,
            role: Math.random() < 0.5 ? "user" : "guest",
        });
    }

    return users;
};

export const insertBulkUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("Connected to MongoDB");

        const bulkUsers = await generateUsers(500); // Change count as needed

        const insertedUsers = await User.insertMany(bulkUsers, { ordered: false });

        console.log(`Inserted ${insertedUsers.length} users successfully`);
        mongoose.connection.close();
    } catch (error) {
        console.error("Error inserting users:", error);
        mongoose.connection.close();
    }
};


