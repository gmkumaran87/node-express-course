const Task = require("../models/Task");

// Getting all the Tasks
const getAllTasks = async(req, res) => {
    try {
        const tasks = await Task.find({});
        res.status(200).json({ success: true, tasks: tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

// Creating the Tasks
const createTask = async(req, res) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({ success: true, data: task });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const getTask = async(req, res) => {
    const { id: taskId } = req.params;
    try {
        const tasks = await Task.findOne({ _id: taskId });
        if (!tasks) {
            res
                .status(400)
                .json({ success: true, msg: `No task with id - ${taskId}` });
        }
        res.status(200).json({ tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const updateTask = async(req, res) => {
    console.log(req.params, req.body);
    const { id: taskId } = req.params;
    try {
        const tasks = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!tasks) {
            res
                .status(400)
                .json({ success: true, msg: `No task with id - ${taskId}` });
        }
        res
            .status(200)
            .json({ status: true, msg: `Task with id -${taskId} Updated`, tasks });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

const deleteTask = async(req, res) => {
    const { id: taskId } = req.params;
    try {
        const tasks = await Task.deleteOne({ _id: taskId });
        if (!tasks) {
            res
                .status(400)
                .json({ success: true, msg: `No task with id - ${taskId}` });
        }
        res
            .status(200)
            .json({ status: true, msg: `Task with id -${taskId} deleted` });
    } catch (error) {
        res.status(500).json({ msg: error });
    }
};

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
};