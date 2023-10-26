const express = require("express");

const router = express.Router();

const apiUser = require("./api/user.api");
router.use("/user", apiUser);

const apiTable = require("./api/table.api");
router.use("/table", apiTable);

module.exports = router;
