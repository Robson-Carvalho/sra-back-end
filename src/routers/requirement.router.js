const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

const controller = require("../controllers/requirement.controller");
router.post("/sra-api/requirement", verifyJWT, controller.post);

module.exports = router;
