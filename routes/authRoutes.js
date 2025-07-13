const express = require("express");
const router = express.Router();
const User = require("../models/User");

// POST /signup
router.post("/signup", async (req, res) => {
    let { username, password } = req.body;

    username = username?.trim().toLowerCase();
    password = password?.trim();

    // Basic validation
    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
        return res.status(409).json({ success: false, message: "User already exists" });
    }

    // Save new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ success: true, message: "Signup successful" });
});

// POST /login
router.post("/login", async (req, res) => {
    let { username, password } = req.body;

    username = username?.trim().toLowerCase();
    password = password?.trim();

    if (!username || !password) {
        return res.status(400).json({ success: false, message: "Username and password are required" });
    }

    const user = await User.findOne({ username, password });

    if (user) {
        res.json({ success: true, message: "Login successful" });
    } else {
        res.json({ success: false, message: "Invalid credentials" });
    }
});

module.exports = router;
