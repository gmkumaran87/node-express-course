const express = require("express");
const authenticateUser = require("../middleware/auth");

const router = express.Router();

const { loginUser, dashboard } = require("../controllers/main");

router.route("/login").post(loginUser);

router.route("/dashboard").get(authenticateUser, dashboard);

module.exports = router;