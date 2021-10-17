console.log("04 Store API");
const express = require("express");
require("dotenv").config();
require("express-async-errors");

const connectDb = require("./db/connect");
const router = require("./routes/products");

// Middleware functions
const errorHandler = require("./middleware/error-handler");
const notFoundHandler = require("./middleware/not-found");

const app = express();

// Middleware - JSON Parser
app.use(express.json());

app.get("/", (req, res) => {
    res.send(
        `<h2> Welcome to Products API</h2> <a href="/api/v1/products/">Products Route</a>`
    );
});

//Calling the Routers
app.use("/api/v1/products/", router);
app.use(errorHandler);
app.use(notFoundHandler);

const port = process.env.PORT || 5000;

const start = async() => {
    try {
        await connectDb(process.env.MONGO_URI);
        app.listen(port, console.log("App started in the port 5000...!"));
    } catch (error) {}
};

start();