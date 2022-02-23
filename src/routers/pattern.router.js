const express = require("express");
const router = express.Router();

const controller = require("../controllers/pattern.controller");
router.get("/sra-api/", controller.get);

module.exports = router;
