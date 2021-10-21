const notFound = (req, res) => {
    console.log(req);
    res.status(404).send("Route does not exist");
};

module.exports = notFound;