const jwt = require("jsonwebtoken");
const unAuthenticated = require("../errors/unAuthenticated");

const authenticateUser = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization || !authorization.startsWith("Bearer")) {
        throw new unAuthenticated("No token presents");
    }

    try {
        const [bearer, token] = req.headers.authorization.split(" ");
        const tokenVerified = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token Verified", tokenVerified);
        req.user = { username: tokenVerified.username, id: tokenVerified.id };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Not authorized to access this route");
    }
};

module.exports = authenticateUser;