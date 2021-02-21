const asyncHandler = require("express-async-handler");
// bring in normalize to give us a proper url, regardless of what user entered
const normalize = require('normalize-url');

const Profile = require("../models/profileModel");
const User = require("../models/userModel");

// @route       GET api/profile/test
// @dec         Test Profile Route
// @access      Public
const testRoute = asyncHandler(async (req, res) => {
    res.json({
        msg: "Profile works"
    })
})

// @route       GET api/profile
// @dec         Get current user profile
// @access      Private
const getCurrentUserProfile = asyncHandler(async (req, res) => {
    const errors = {}
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ["name", "avatar"])

    if (!profile) {
        // errors.noprofile = "There is no profile for this user"
        res.status(404)
        throw new Error("There is no profile for this user");
    }
    res.json(profile)
})

// @route       POST api/profile
// @dec         Create user profile
// @access      Private
const createUserProfile = asyncHandler(async (req, res) => {
    // destructure the request
    const {
        website,
        skills,
        youtube,
        twitter,
        instagram,
        linkedin,
        facebook,
        // spread the rest of the fields we don't need to check
        ...rest
    } = req.body;

    // build a profile
    const profileFields = {
        user: req.user.id,
        website:
            website && website !== ''
                ? normalize(website, { forceHttps: true })
                : '',
        skills: Array.isArray(skills)
            ? skills
            : skills.split(',').map((skill) => '' + skill.trim()),
        ...rest
    };

    // Build socialFields object
    const socialFields = { youtube, twitter, instagram, linkedin, facebook };

    // normalize social fields to ensure valid url
    for (const [key, value] of Object.entries(socialFields)) {
        if (value && value.length > 0)
            socialFields[key] = normalize(value, { forceHttps: true });
    }
    // add to profileFields
    profileFields.social = socialFields;

    // Using upsert option (creates new doc if no match is found):
    let profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: profileFields },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );
    return res.json(profile);
})

// @route       GET api/profile/all
// @dec         Get all Profiles
// @access      Public
const getAllProfiles = asyncHandler(async (req, res) => {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
})

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
const getProfileByID = asyncHandler(async (req, res) => {
    const userId = req.params.user_id
    const profile = await Profile.findOne({ user: userId }).populate('user', ['name', 'avatar']);

    if (!profile) {
        res.status(404)
        throw new Error("There is no profile for this user");
    }
    res.json(profile);
})

// @route    PUT api/profile/experience
// @desc     Add profile experience
// @access   Private
const addExperienceToProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
        res.status(404)
        throw new Error("There is no profile for this user");
    }

    //Add to experience array
    profile.experience.unshift(req.body);

    await profile.save();

    res.json(profile);
})

// @route    PUT api/profile/education
// @desc     Add profile education
// @access   Private
const addEducationToProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
        res.status(404)
        throw new Error("There is no profile for this user");
    }

    //Add to experience array
    profile.education.unshift(req.body);

    await profile.save();

    res.json(profile);
})

// @route    DELETE api/profile/experience/:exp_id
// @desc     Delete experience from profile
// @access   Private
const deleteExperienceFromProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
        res.status(404)
        throw new Error("There is no profile for this user");
    }

    profile.experience = profile.experience.filter(
        (exp) => exp._id.toString() !== req.params.exp_id
    );

    await profile.save();
    res.json(profile);
})

// @route    DELETE api/profile/education/:edu_id
// @desc     Delete education from profile
// @access   Private
const deleteEducationFromProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id
    const profile = await Profile.findOne({ user: userId });

    if (!profile) {
        res.status(404)
        throw new Error("There is no profile for this user");
    }

    profile.education = profile.education.filter(
        (edu) => edu._id.toString() !== req.params.edu_id
    );

    await profile.save();
    res.json(profile);
})

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
const deleteProfile = asyncHandler(async (req, res) => {
    await Profile.findOneAndRemove({ user: req.user.id })
    await User.findOneAndRemove({ _id: req.user.id })
    // await Post.deleteMany({ user: req.user.id }),

    res.json({ success: true })
})

module.exports = { testRoute, getCurrentUserProfile, createUserProfile, getAllProfiles, getProfileByID, addExperienceToProfile, addEducationToProfile, deleteExperienceFromProfile, deleteEducationFromProfile, deleteProfile }