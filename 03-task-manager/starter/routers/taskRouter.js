const express = require("express");
const {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask,
} = require("../controllers/task");

// Invoking the Router
const router = express.Router();

// Setting up of the API handler for GET and POST requests
router.route("/").get(getAllTasks).post(createTask);

// Setting up Single task request
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

module.exports = router;