const { check, validationResult } = require('express-validator')

const userRegisterValidationRules = () => {
    return [
        //Name must be between 2 and 30 characters
        check('name', 'Name must be between 2 and 30 characters').isLength({ min: 2, max: 30 }),
        // username must be an email
        check('email', 'Please include a valid email').isEmail(),
        // password must be at least 5 chars long
        check('password', 'Password must be minimum of 5 characters').isLength({ min: 5 }).exists(),
    ]
}

const userLoginValidationRules = () => {
    return [
        // username must be an email
        check('email', 'Please include a valid email').isEmail(),
        // password must be at least 5 chars long
        check('password', 'Password must be minimum of 5 characters').isLength({ min: 5 }).exists(),
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
    validate,
}