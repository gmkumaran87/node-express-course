const mongoose = require("mongoose");

const connectDb = (url) => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: true,
            useUnifiedTopology: true,
        })
        .then((data) => console.log("Connected to dB"))
        .catch((err) => console.log(err));
};

module.exports = connectDb;