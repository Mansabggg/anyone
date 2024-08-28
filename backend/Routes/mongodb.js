const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://anyonemern:mern123@cluster0.p1xjudb.mongodb.net/foody2?retryWrites=true&w=majority";

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        throw error;
    }
};

const fetchData = async (user2) => {
    try {
        const collection = mongoose.connection.db.collection(user2);
        const data = await collection.find({}).toArray();
        return data;
    } catch (error) {
        console.error(`Error fetching data from ${user2}:`, error);
        throw error;
    }
};

module.exports = { connectDB, fetchData };
