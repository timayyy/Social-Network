const { check, validationResult } = require('express-validator')

const userRegisterValidationRules = () => {
    return [
        //Name field validation
        check('name')
            //Name must be between 2 and 30 characters
            .isLength({ min: 2, max: 30 })
            .withMessage('Name must be between 2 and 30 characters')
            //Name is required
            .exists()
            .withMessage("Name field is required")
            .trim(),

        //Email field validation
        check('email')
            // email must be a valid email
            .isEmail()
            .withMessage("Email is invalid")
            // email is required
            .exists()
            .withMessage("Email field is required"),

        //Password field validation
        check('password')
            // password must be at least 6 chars long
            .isLength({ min: 6, max: 30 })
            .withMessage('Password must be between 6 to 30 characters')
            // password is required
            .exists()
            .withMessage("Password field is required"),

        //Confirm Password field validation
        check('password2').custom((value, { req }) => {
            if (value !== req.body.password) {
                console.log(req.body.password, req.body.password2);
                throw new Error("Passwords must match")
            }
            return true;
        })
            // password2 is required
            .exists()
            .withMessage("Confirm password field is required"),

    ]
}

const userLoginValidationRules = () => {
    return [
        //Email field validation
        check('email')
            // email must be a valid email
            .isEmail()
            .withMessage("Email is invalid")
            // email is required
            .exists()
            .withMessage("Email field is required"),

        //Password field validation
        check('password')
            // password is required
            .exists()
            .withMessage("Password field is required"),
    ]
}

const userProfileValidationRules = () => {
    return [
        //Status field validation
        check('status')
            // status is required
            .exists()
            .withMessage("Status field is required"),

        //Skills field validation
        check('skills')
            // skills is required
            .exists()
            .withMessage("Skills field is required"),
        //website field validation
        // check('website').custom((value, { req }) => {
        //     if (req.body.website !== "" || req.body.website !== "undefined" || !req.body.website) {
        //         console.log(req.body.website, req.body.password2);
        //         return value;
        //     }
        // }).isURL().withMessage("Must be a valid URL")
    ]
}

const userProfileExperienceValidationRules = () => {
    return [
        //Title field validation
        check('title')
            // Title is required
            .exists()
            .withMessage("Job title field is required"),

        //Company field validation
        check('company')
            // Company is required
            .exists()
            .withMessage("Company field is required"),
        //Company field validation
        check('from')
            // Company is required
            .exists()
            .withMessage("From date field is required"),
    ]
}

const userProfileEducationValidationRules = () => {
    return [
        //School field validation
        check('school')
            // School is required
            .exists()
            .withMessage("School field is required"),

        //Degree field validation
        check('degree')
            // Degree is required
            .exists()
            .withMessage("Degree field is required"),
        //Field of study field validation
        check('fieldofstudy')
            // Field of study is required
            .exists()
            .withMessage("Field of study field is required"),
        //From date field validation
        check('from')
            // From date is required
            .exists()
            .withMessage("From date field is required"),
    ]
}

const userPostValidationRules = () => {
    return [
        //Text field validation
        check('text')
            // Text is required
            .exists()
            .withMessage("Text field is required")
            .isLength({ min: 2, max: 300 })
            .withMessage("Text must be between 2 and 300 characters"),
    ]
}

const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    // const extractedErrors = []
    // errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

    const extractedErrors = errors.array().reduce((acc, cur) => ({ ...acc, [cur.param]: cur.msg }), {})
    // const objExtractedErrors = extractedErrors.reduce((acc,cur) => ({...acc , }))

    return res.status(422).json({
        errors: extractedErrors,
    })
}

module.exports = {
    userRegisterValidationRules,
    userLoginValidationRules,
    userProfileValidationRules,
    userProfileExperienceValidationRules,
    userProfileEducationValidationRules,
    userPostValidationRules,
    validate,
}