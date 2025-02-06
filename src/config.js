import mongoose from 'mongoose';


const url = process.env.MONGO_URI

console.log(url)
const connectDB = async () => {
    try {
        await mongoose.connect(url);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1);
    }
};

export default connectDB;
