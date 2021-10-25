const express = require("express");
const jwt = require("jsonwebtoken");
const { UnauthenticatedError } = require("../errors");

const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.includes("Bearer ")) {
        throw new UnauthenticatedError("Invalid Authentication");
    }

    const token = authHeader.split(" ")[1];

    try {
        const tokenValid = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: tokenValid.userId, name: tokenValid.name };
        next();
    } catch (error) {
        throw new UnauthenticatedError("Invalid Authentications");
    }
};

module.exports = authentication;