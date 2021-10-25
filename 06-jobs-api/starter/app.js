require("dotenv").config();
require("express-async-errors");
const express = require("express");
const connectDb = require("./db/connect");

// Security Libraries
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");

const app = express();

// Router setup
const authRouter = require("./routes/auth");
const jobRouter = require("./routes/jobs");

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// Authentication Middleware
const authentication = require("./middleware/authentication");

// extra packages
app.set("trust proxy", 1);
app.use(
    rateLimiter({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100,
    })
);

app.use(express.json());
app.use(helmet);
app.use(cors);
app.use(xss);

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authentication, jobRouter); // Protecting Jobs router with Authentication Middleware

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

app.get("*", (req, res) => {
    console.log(req.url);
    res.status(404).send("Page not found...!");
});

const port = process.env.PORT || 5000;

const start = async() => {
    try {
        const db = await connectDb(process.env.MONGO_URI);
        app.listen(port, () =>
            console.log(`Server is listening on port ${port}...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();