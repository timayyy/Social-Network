const express = require("express");
const {
    testRoute,
    getCurrentUserProfile,
    createUserProfile,
    getAllProfiles,
    getProfileByID,
    addExperienceToProfile,
    deleteExperienceFromProfile,
    addEducationToProfile,
    deleteEducationFromProfile,
    deleteProfile
} = require("../controllers/profileController");
const { userProfileValidationRules, userProfileExperienceValidationRules, userProfileEducationValidationRules, validate } = require("../utils/validator")
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/test").get(testRoute);
router.route("/").get(protect, getCurrentUserProfile).post(protect, userProfileValidationRules(), validate, createUserProfile).delete(protect, deleteProfile);
router.route("/all").get(getAllProfiles);
router.route("/user/:user_id").get(getProfileByID);
router.route("/experience").post(protect, userProfileExperienceValidationRules(), validate, addExperienceToProfile);
router.route("/experience/:exp_id").delete(protect, deleteExperienceFromProfile);
router.route("/education").post(protect, userProfileEducationValidationRules(), validate, addEducationToProfile);
router.route("/education/:edu_id").delete(protect, deleteEducationFromProfile);
// router.route("/login").post(userLoginValidationRules(), validate, loginUser);
// router.route("/current").get(protect, getCurrentUser);
// router.post("/login", authUser);
// router.route("/profile").get(protect, getUserProfile);

module.exports = router;