// config/index.js
import dotenv from 'dotenv';
dotenv.config();

export default {
    jwtSecret: process.env.JWT_SECRET,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    STRIPE_PUBLIC_KEY: process.env.STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL: process.env.GMAIL,
    ADMIN: process.env.ADMIN
};


