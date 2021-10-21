require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

//Router Import
const router = require("./routes/main");

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static("./public"));
app.use(express.json());

// Router setup
app.use("/api/v1/", router);

app.get("*", (req, res) => {
    console.log("Default route", req);
    res.status(404).send("Page not found...!");
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async() => {
    try {
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();