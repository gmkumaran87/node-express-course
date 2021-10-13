const logger = (req, res, next) => {
    const method = req.method;
    const url = req.url;
    const time = new Date().getFullYear();
    const date = new Date().getFullYear();
    console.log(method, url, time, date);
    next();
};

module.exports = logger;