const express = require('express');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userRoute = express.Router();



userRoute.post('/register', async (req, res) => {
    let { email, password } = req.body;
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) res.json({ msg: "Something went wrong", success: false });
            else {
                const user = new userModel({ email, password: hash });
                await user.save();
                res.json({ msg: "User registered successfully", success: true });
            }
        })
    } catch (error) {
        res.json({ msg: "Something went wrong", success: false });
    }
});

userRoute.post("/login", async (req, res) => {
    let { email, password } = req.body;
    try {
        let user = await userModel.findOne({ email: email });
        if (!user) return res.json({ msg: "Invalid User and Password", success: false });
        if (!email && !password) return res.json({ msg: "Invalid User and Password", success: false });
        const valid = bcrypt.compareSync(password, user.password);
        if (!valid) {
            return res.json({ msg: "Invalid User and Password", success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.SECRET_CODE);
            res.json({ msg: "Login successful", token, success: true });
        }

    } catch (error) {
        res.json({ msg: "Something went wrong", success: false });
    }
});




module.exports = userRoute;