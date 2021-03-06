const express = require("express");
const {
    testRoute, registerUser, loginUser, getCurrentUser, followUser, unfollowUser
} = require("../controllers/userController");
const { userRegisterValidationRules, userLoginValidationRules, validate } = require("../utils/validator")
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/test").get(testRoute);
router.route("/register").post(userRegisterValidationRules(), validate, registerUser);
router.route("/login").post(userLoginValidationRules(), validate, loginUser);
router.route("/current").get(protect, getCurrentUser);
router.route("/follow").put(protect, followUser);
router.route("/unfollow").put(protect, unfollowUser);
// router.post("/login", authUser);
// router.route("/profile").get(protect, getUserProfile);

module.exports = router;
