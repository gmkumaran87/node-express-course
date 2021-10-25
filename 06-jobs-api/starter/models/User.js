const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter the name"],
        minlength: 3,
        maxlength: 50,
    },
    email: {
        type: String,
        required: [true, "Please provide email"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
        minlength: 6,
    },
});

// Middleware for Hashing the Passwords
userSchema.pre("save", async function() {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Generating Json Web Tokens
userSchema.methods.jsonToken = function() {
    const token = jwt.sign({ userId: this._id, name: this.name },
        process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_LIFETIME,
        }
    );
    return token;
};

// Compare the Password from Login page with stored one in DB
userSchema.methods.comparePassword = async function(enteredPassword) {
    const isCorrect = await bcrypt.compare(enteredPassword, this.password);
    return isCorrect;
};

module.exports = mongoose.model("User", userSchema);