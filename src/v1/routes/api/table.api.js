const express = require("express");
const TableController = require("../../controllers/table.controller");
const router = express.Router();
const { auth } = require("../../../middleware/checkAuth");

router.post("/", auth, TableController.createEntry);
router.get("/", auth, TableController.getEntries);
router.put("/:id", auth, TableController.updateEntry);
router.delete("/:id", auth, TableController.deleteEntry);

module.exports = router;
