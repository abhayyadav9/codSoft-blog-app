import mongoose from 'mongoose';

export const connectToDatabase = async (username, password) => {
    const URL =`mongodb+srv://${username}:${password}@blog-app.xeitms1.mongodb.net/?retryWrites=true&w=majority&appName=blog-app`;
    // 
    
    try {
        await mongoose.connect(URL);
        console.log("MongoDB connected");

    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
};
