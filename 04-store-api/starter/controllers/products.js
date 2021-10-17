const Products = require("../models/product");

const getAllProducts = async(req, res) => {
    // throw new Error("testing async errors");
    console.log(req.url);
    const products = await Products.find({});
    res.status(200).json({ success: true, data: products });
};

const getAllStaticProducts = (req, res) => {
    console.log(req.url);
    res.status(200).json({ success: true, msg: "All the Static Products" });
};

const searchAllProducts = async(req, res) => {
    const { name, featured, sort, company, fields, numericFilters } = req.query;
    console.log(req.query, featured);
    const queryObj = {};

    if (featured) {
        queryObj["featured"] = featured === "true" ? true : false;
    }

    if (company) {
        queryObj.company = company;
    }
    if (name) {
        queryObj.name = { $regex: name, $options: "i" };
    }

    if (numericFilters) {
        const operatorsMap = {
            ">": "$gt",
            "<": "$lt",
            ">=": "$gte",
            "<=": "$lte",
            "=": "$eq",
        };
        const re = /\b(>|<|>=|<=|=)\b/g;

        let filters = numericFilters.replace(
            re,
            (match) => `-${operatorsMap[match]}-`
        );
        const options = ["price", "rating"];
        console.log(`Filters-`, filters);
        filters = filters.split(",").forEach((item) => {
            const [field, operand, value] = item.split("-");

            if (options.includes(field)) {
                queryObj[field] = {
                    [operand]: Number(value),
                };
            }
        });
    }

    let results = Products.find(queryObj);

    if (sort) {
        const sortList = sort.split(",").join(" ");
        results = results.sort(sortList);
    } else {
        results = results.sort("name");
    }

    if (fields) {
        const fieldList = fields.split(",").join(" ");
        results = results.select(fieldList);
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);
    const products = await results;

    // const products = await Products.find(queryObj);
    res.status(200).json({ success: true, data: products });
};

module.exports = {
    getAllProducts,
    getAllStaticProducts,
    searchAllProducts,
};