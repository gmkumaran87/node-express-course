const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors/bad_reques");

const loginUser = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new BadRequest("Please provide username and Email");
    }

    const id = new Date().getDate();

    const token = jwt.sign({ username, id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "User CREATED", token });
};

const dashboard = (req, res) => {
    const luckyNumber = Math.floor(Math.random() * 100);

    res.status(200).json({
        msg: `Hello Mr. ${req.user.username}`,
        secret: `Here is your authorized data and lucky number is ${luckyNumber}`,
    });
};

module.exports = { loginUser, dashboard };