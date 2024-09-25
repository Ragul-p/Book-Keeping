const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../model/users.model");

function generateJWTToken(id) {
    return jwt.sign({ userId: id }, process.env.ACCESS_TOKEN_KEY);
}

async function registerUser(req, res) {
    try {
        const { name, email, password, userType, userRole } = req.body;

        const findUser = await User.findOne({ where: { email } });
        if (findUser) { return res.status(400).json({ message: "error", description: "already available user with this mail id" }) };

        const hashPassword = bcrypt.hashSync(password, 10);
        const newUser = await User.create({ name, email, password: hashPassword, userType, userRole });
        if (newUser) { return res.status(200).json({ message: "success", description: "successfully newUser Created" }) };

    } catch (error) {
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function loginUser(req, res) {
    try {
        const { email, password } = req.body;

        const findUser = await User.findOne({ where: { email } });
        if (!findUser) { return res.status(400).json({ message: "error", description: "user not found with this mail id" }) };

        const comparePassword = bcrypt.compareSync(password, findUser.password);
        if (!comparePassword) { return res.status(400).json({ message: "error", description: "password id invalid" }) };

        const token = generateJWTToken(findUser.id);
        return res.status(200).json({ message: "success", description: "successfully login", token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}

module.exports = { registerUser, loginUser };