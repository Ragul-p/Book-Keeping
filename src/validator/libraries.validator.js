const Joi = require("joi");

const createLibrarieValidator = Joi.object({
    name: Joi.string().required()
});


const updateLibrarieValidator = Joi.object({
    name: Joi.string().required()
});



module.exports = { createLibrarieValidator, updateLibrarieValidator };
