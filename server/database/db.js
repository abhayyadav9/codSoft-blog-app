import mongoose from 'mongoose';

const Connection = async (username, password) => {
    const URL =`mongodb+srv://${username}:${password}@app.3vgkmhm.mongodb.net/?retryWrites=true&w=majority&appName=app`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;