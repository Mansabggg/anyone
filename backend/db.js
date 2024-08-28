const mongoose = require("mongoose");
require("dotenv").config();

const mongoURI = process.env.MONGO_URI || "mongodb+srv://anyonemern:mern123@cluster0.p1xjudb.mongodb.net/foody2?retryWrites=true&w=majority";

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB connected");

        // Access the database
        const db = mongoose.connection.db;

        // Fetch data from 'food_items' collection
        const foodItemsCollection = db.collection("food_items");
        const foodItems = await foodItemsCollection.find({}).toArray();
        console.log("Food Items Data:", foodItems);

        // Fetch data from 'foodcatgory' collection
        const foodCategoryCollection = db.collection("foodcatgory");
        const foodCategories = await foodCategoryCollection.find({}).toArray();
        console.log("Food Category Data:", foodCategories);

        // Fetch data from 'user2' collection
        const user2Collection = db.collection("User");
        const user2Data = await user2Collection.find({}).toArray();
        console.log("User2 Data:", user2Data);

        // Assign data to global variables
        global.food_items = foodItems;
        global.foodcatgory = foodCategories;
        global.User = user2Data;

        // If needed, keep the connection open for further operations
        // mongoose.connection.close();
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

// Execute the function
mongoDB();

module.exports = mongoDB;
