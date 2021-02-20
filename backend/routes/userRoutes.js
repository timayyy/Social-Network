const express = require("express");
const {
    testRoute
} = require("../controllers/userController");
// const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/test").get(testRoute);
// router.route("/").post(registerUser).get(protect, getUsers);
// router.post("/login", authUser);
// router.route("/profile").get(protect, getUserProfile);

module.exports = router;
