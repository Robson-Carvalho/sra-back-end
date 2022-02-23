const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth/auth.controller");
router.post("/sra-api/login", controller.post);

module.exports = router;
