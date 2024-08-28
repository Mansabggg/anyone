const mongoose = require("mongoose");

const user2Schema = new mongoose.Schema({
    email: { type: String, unique: true, required: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    location: { type: String },
    createdAt: { type: Date, default: Date.now }
});

const User2 = mongoose.model("User2", user2Schema);

module.exports = User2;
