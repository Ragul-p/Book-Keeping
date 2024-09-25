const Joi = require("joi");

const registerUserValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    userType: Joi.string().valid("AUTHOR", "BORROWER").required(),
    userRole: Joi.string().valid("ADMIN", "USER").required(),
});

const loginUserValidator = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
});


module.exports = { registerUserValidator, loginUserValidator };
