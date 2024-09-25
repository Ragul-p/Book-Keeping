const router = require("express").Router();

const { loginUser, registerUser } = require("../controller/user.controller");
const { validateRequest } = require("../middleware/validation.middleware");
const { registerUserValidator, loginUserValidator } = require("../validator/user.validator");


router.post("/register", validateRequest(registerUserValidator), registerUser);
router.post("/login", validateRequest(loginUserValidator), loginUser);



module.exports = router;