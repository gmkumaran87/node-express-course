const mongoose = require("mongoose");

const jobsSchema = new mongoose.Schema({
    company: {
        type: String,
        required: [true, "Please enter the company name"],
        minlength: 3,
        maxlength: 50,
    },
    position: {
        type: String,
        required: [true, "Please enter the company position"],
        minlength: 3,
        maxlength: 75,
    },
    status: {
        type: String,
        enum: ["Interview", "Pending", "Declined"],
        default: "Pending",
    },

    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide the User"],
    },
}, { timestamps: true });

module.exports = mongoose.model("Jobs", jobsSchema);