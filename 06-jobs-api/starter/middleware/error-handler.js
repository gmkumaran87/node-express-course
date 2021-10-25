const { CustomAPIError } = require("../errors");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (err, req, res, next) => {
    // console.log(err);
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something Went wrong, please try again later.",
    };

    console.log("Before Validation error");

    if (err.name === "ValidatorError") {
        customError.msg = Object.values(err.errors)
            .map((item) => item.message)
            .join(",");
        customError.statusCode = StatusCodes.BAD_REQUEST;
    }
    console.log("Before Duplicate error");
    if (err.code || err.code === 11000) {
        (customError.msg = `Duplicate value entered for ${Object.keys(
      err.keyValue
    )} fields, Please chose a different one`),
        (customError.statusCode = 400);
    }

    if (err.name === "CastError") {
        customError.statusCode = 404;
        customError.msg = `No items found with id - ${err.value}`;
    }
    /*return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err });
        console.log("Before default error");*/
    return res.status(customError.statusCode).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;