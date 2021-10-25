const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/");

const bcrypt = require("bcryptjs");

const registerUser = async(req, res) => {
    console.log(req.url);

    const user = await User.create({...req.body });

    const token = user.jsonToken();

    res.status(StatusCodes.CREATED).json({ userName: user.name, token });
};

const loginUser = async(req, res) => {
    const { email, password } = req.body;

    console.log(email, password);

    if (!email || !password) {
        throw new BadRequestError("Please provide email and passowrd");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    // Checking entered password
    const isCorrect = await user.comparePassword(password);

    if (!isCorrect) {
        throw new UnauthenticatedError("Invalid Credentials");
    }

    const token = user.jsonToken();
    res.status(StatusCodes.CREATED).json({ userName: user.name, token });
};

module.exports = {
    loginUser,
    registerUser,
};