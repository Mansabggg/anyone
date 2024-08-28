const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtsecret = "My Name Is Mansab And I am Developer$#";

// Route for creating a user
router.post('/creatuser',
    body("email").isEmail(),
    body("password", 'Password must be at least 5 characters long').isLength({ min: 5 }),
    body("name", 'Name must be at least 5 characters long').isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ error: errors.array() });
        }

        try {
            // Check if the email is already registered
            let existingUser = await User.findOne({ email: req.body.email });
            if (existingUser) {
                return res.status(400).json({ error: "A user with this email already exists" });
            }

            // Hash the password
            const salt = await bcrypt.genSalt(10);
            let secPassword = await bcrypt.hash(req.body.password, salt);

            // Create the user
            await User.create({
                name: req.body.name,
                password: secPassword,
                email: req.body.email,
                location: req.body.location
            });

            res.json({ success: true });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Server error" });
        }
    });

// Route for logging in a user
router.post("/loginuser",
    body("email").isEmail(),
    body("password").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try {
            // Check if the user exists
            let userData = await User.findOne({ email });
            if (!userData) {
                return res.status(400).json({ errors: "Invalid email or password" });
            }

            // Compare the password
            const pwd = await bcrypt.compare(req.body.password, userData.password);
            if (!pwd) {
                return res.status(400).json({ errors: "Invalid email or password" });
            }

            // Create and send the JWT token
            const data = {
                user: {
                    id: userData.id
                }
            }

            const authToken = jwt.sign(data, jwtsecret);

            return res.json({ success: true, authToken: authToken });
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, error: "Server error" });
        }
    }
);

module.exports = router;
