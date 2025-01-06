"use strict";
const express = require("express");
const asyncHandler = require("../../helpers/asyncHandler");
const VerifyCodeController = require("../../controllers/verify-code.controller");
const router = express.Router();

router.post("/verify-code", asyncHandler(VerifyCodeController.verifyCode));
router.post("/send-code", asyncHandler(VerifyCodeController.sendCode));

module.exports = router;
