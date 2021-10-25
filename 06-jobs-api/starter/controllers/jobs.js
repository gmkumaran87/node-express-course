const Jobs = require("../models/Job");
const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError, UnauthenticatedError } = require("../errors/");

const getAllJobs = async(req, res) => {
    const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
        "-createdAt"
    );
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getJob = async(req, res) => {
    const userId = req.user.userId;
    const jobsId = req.params.id;

    const job = await Jobs.findOne({ _id: jobsId, createdBy: userId });

    if (!job) {
        throw new NotFoundError("Jobs not found");
    }
    res.status(StatusCodes.OK).json({ job });
};
const createJob = async(req, res) => {
    // Attaching the User Id provided by the User

    req.body.createdBy = req.user.userId;

    const job = await Jobs.create(req.body);

    res.status(StatusCodes.CREATED).json({ job });
};
const updateJob = async(req, res) => {
    const userId = req.user.userId;
    const jobsId = req.params.id;

    const job = await Jobs.findByIdAndUpdate({ _id: jobsId, createdBy: userId },
        req.body, { new: true, runValidators: true }
    );
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).json({ job });
};
const deleteJob = async(req, res) => {
    const userId = req.user.userId;
    const jobsId = req.params.id;

    const job = await Jobs.findByIdAndDelete({
        _id: jobsId,
        createdBy: userId,
    });
    if (!job) {
        throw new NotFoundError(`No job with id ${jobId}`);
    }
    res.status(StatusCodes.OK).send("Deleted the job");
};

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
};