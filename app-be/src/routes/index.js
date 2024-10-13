"use strict";

const express = require("express");
const router = express.Router();

router.use("/v1/api/auth", require("./auth"));
router.use("/v1/api", require("./product"));
router.use("/v1/api", require("./user"));
router.use("/v1/api", require("./article"));
router.use("/v1/api", require("./order"));
router.use("/v1/api", require("./upload"));
router.use("/v1/api", require("./category-product"));
module.exports = router;
