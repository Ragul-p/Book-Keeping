const jwt = require("jsonwebtoken");
const Users = require("../model/users.model");

async function authenticateToken(req, res, next) {
    try {
        const token = req.headers?.authorization?.replace("Bearer ", "");
        if (!token) { return res.status(400).json({ message: "error", description: "authorization token is missing in this headers" }) };

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
        const userId = decodedToken.userId;

        const findUser = await Users.findByPk(userId);
        if (!findUser) { return res.status(400).json({ message: "error", description: "no user found with this token" }) };

        const user = findUser.toJSON();

        req.userId = user?.id || null;
        req.userEmail = user?.email || null;
        req.role = user?.userRole || null;
        console.log(user?.userRole);

        next();

    } catch (error) {
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}


async function autherization(req, res, next) {
    try {
        if (req.role != "ADMIN") { return res.status(400).json({ message: "error", description: "only ADMIN an Access these route" }) }
        next();
    } catch (error) {
        return res.status(500).json({ message: "server_error", description: "Server Error" });
    }
}



module.exports = { authenticateToken, autherization };