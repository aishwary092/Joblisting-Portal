import mongoose from "mongoose";

// Function to connect to the MongoDB database

const connectDB = async () => {
    const uri = 'mongodb://localhost:27017/job-portal'; // Using local MongoDB
    console.log('Connecting to MongoDB:', uri);

    mongoose.connection.on('connected',()=> console.log('Database Connected'))
    await mongoose.connect(uri)
    console.log('MongoDB connection attempt made')
}

export default connectDB