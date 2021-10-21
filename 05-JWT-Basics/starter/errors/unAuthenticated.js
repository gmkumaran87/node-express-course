const CustomAPIError = require("./custom-error");
const { StatusCodes } = require("http-status-codes");

console.log("Authentication ", CustomAPIError);
class UnAuthentication extends CustomAPIError {
    constructor(message) {
        super(message);
        this.statusCode = StatusCodes.UNAUTHORIZED;
    }
}

module.exports = UnAuthentication;