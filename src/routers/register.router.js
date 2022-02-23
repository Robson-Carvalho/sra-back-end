const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

const controller = require("../controllers/register.controller");
router.post("/sra-api/register", verifyJWT, controller.post);

module.exports = router;
