const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const User = require("../models/userModel");


// @route       GET api/users/test
// @dec         Test User Route
// @access      Public
const testRoute = asyncHandler(async (req, res) => {
    res.json({
        msg: "Users works"
    })
})

// @route       POST api/users/register
// @dec         Register a User
// @access      Public
const registerUser = asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("Email already exists");
    }

    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    const user = await User.create({
        name,
        email,
        avatar,
        password,
    });

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            password: user.password,
            token: generateToken(user._id),
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }

})


// @route       GET api/users/login
// @dec         Login User / Auth user and return token
// @access      Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    //Find the user by email
    const user = await User.findOne({ email });

    //Check Password and user
    if (user && (await user.matchPassword(password))) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            token: generateToken(user._id),
        });
    } else {
        res.status(401);
        throw new Error("Invalid email or password");
    }
})

// @route       GET api/users/current
// @dec         Get cuurent user
// @access      Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


module.exports = { testRoute, registerUser, loginUser, getCurrentUser }