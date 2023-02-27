const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require("../models/User");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'Ajayisagoodb$oy';

//ROUTE 1: Create a User using: POST "/api/auth/createUser". Does'nt require auth
router.post("/createUser", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check wheather the user with this email is already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send({ success: false, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const securePass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePass,
        });

        const data = {
            user: {
                id: user.id
            }
        }

        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authtoken });

    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }

});

//ROUTE 2: Authenticate a User using: POST "/api/auth/login".
router.post("/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) {
            res.status(400).json({ message: "Please try to login with correct credentials" });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            res.status(400).json({ success: false, message: "Please try to login with correct credentials" });
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);

        res.json({ success: true, authtoken });

    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }
});

//ROUTE 3: Get loggedin User details using: POST "/api/auth/getuser". Login required
router.post("/getuser", fetchuser, async (req, res) => {
    try {
        userId = req.user.id;
        // console.log(req.user);
        const user = await User.findById(userId).select("-password");
        res.status(200).send({ user });
    } catch (error) {
        const errObj = new Error(error);
        return res.status(500).send({
            success: false,
            message: errObj.message
        });
    }
})





module.exports = router;