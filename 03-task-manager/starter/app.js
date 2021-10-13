console.log("Task Manager App");
const { json } = require("express");
const express = require("express");
const taskRouter = require("./routers/taskRouter");
const connectDb = require("./db/connect");
require("dotenv").config();

const app = express();

// JSON BodyParset
app.use(express.json());

// Starting the home page of the Application Task manager
app.use(express.static("./public"));

// Calling Routers for the API requests
app.use("/api/v1/tasks", taskRouter);

app.get("*", (req, res) => {
    console.log(req);
    res.status(404).send("Page not found...!");
});

const port = 5000;
const start = async() => {
    try {
        const data = await connectDb(process.env.MONGO_URL);
        app.listen(port, console.log("Server started at the port no 5000....!"));
    } catch (error) {
        console.log("Something went wrong in Database connection...!");
    }
};

start();