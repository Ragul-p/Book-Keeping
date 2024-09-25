const Joi = require("joi");

const createBookValidator = Joi.object({
    bookName: Joi.string().required(),
    imageUrl: Joi.string().required(),
    createdBy: Joi.number().required()
});

const updateBookValidator = Joi.object({
    bookName: Joi.string().required(),
    imageUrl: Joi.string().required(),
});

module.exports = { createBookValidator, updateBookValidator };
