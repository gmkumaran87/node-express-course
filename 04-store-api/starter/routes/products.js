const express = require("express");
const router = express.Router();

const {
    getAllProducts,
    getAllStaticProducts,
    searchAllProducts,
} = require("../controllers/products");

router.route("/").get(getAllProducts);

router.route("/query").get(searchAllProducts);
router.route("/static").get(getAllStaticProducts);

module.exports = router;