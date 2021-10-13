const authorize = (req, res, next) => {
    console.log("Query", req.query);
    const { user } = req.query;
    console.log(`Authorizing the User - ${user}`);

    if (user === "John") {
        req.user = { name: "Muthu", id: 3 };
        next();
    } else {
        res.status(401).send("Unathorized User");
    }
};

module.exports = authorize;