const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const gravatar = require('gravatar');

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
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({ errors: errors.array() });
    // }
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
        throw new Error("Wrong email or password");
    }
})

// @route       GET api/users/current
// @dec         Get cuurent user
// @access      Private
const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})

// @route       GET api/users/follow
// @dec         Follow a user
// @access      Private
const followUser = asyncHandler(async (req, res) => {
    const { followId } = req.body

    const leader = await User.findById(followId).select('-password');
    const user = await User.findById(req.user.id).select('-password');

    if (!leader) {
        res.status(401);
        throw new Error("User not found");
    }

    // Check if already following user
    if (leader.followers.some((follower) => follower.user.toString() === req.user.id)) {
        res.status(400);
        throw new Error('Already following this user');
    }

    //Add follower
    leader.followers.unshift({
        user: req.user.id,
        name: user.name,
        avatar: user.avatar,
    });

    //Add following
    user.following.unshift({
        user: followId,
        name: leader.name,
        avatar: leader.avatar,
    });

    await leader.save();
    await user.save()

    res.json({ leader: leader.followers, user: user.following });
})

// @route       GET api/users/follow
// @dec         Follow a user
// @access      Private
const unfollowUser = asyncHandler(async (req, res) => {
    const { followId } = req.body

    const leader = await User.findById(followId).select('-password');
    const user = await User.findById(req.user.id).select('-password');

    if (!leader) {
        res.status(401);
        throw new Error("User not found");
    }

    // Check if not yet following user
    if (!leader.followers.some((follower) => follower.user.toString() === req.user.id)) {
        res.status(400);
        throw new Error('Cannot unfollow user');
    }

    //Remove follower
    leader.followers = leader.followers.filter(
        ({ user }) => user.toString() !== req.user.id
    );

    //Remove following
    user.following = user.following.filter(
        ({ user }) => user.toString() !== followId
    );

    await leader.save();
    await user.save()

    res.json({ leader: leader.followers, user: user.following });
})

module.exports = { testRoute, registerUser, loginUser, getCurrentUser, followUser, unfollowUser }