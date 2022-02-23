const express = require("express");
const router = express.Router();
const verifyJWT = require("../middlewares/verifyJWT");

const controller = require("../controllers/changePassword.controller");
router.put("/sra-api/change-password", verifyJWT, controller.put);

module.exports = router;
