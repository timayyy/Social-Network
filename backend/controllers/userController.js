const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
// const Admin = require("../models/adminModel");


// @route       GET api/users/test
// @dec         Test User Route
// @access      Public
const testRoute = asyncHandler(async (req, res) => {
    res.json({
        msg: "Users works"
    })
})


module.exports = { testRoute }