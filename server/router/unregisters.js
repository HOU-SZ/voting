const express = require("express");
const unregistersCtrl = require("../controller/unregisters");
const unregistersValidator = require("../validator/unregisters");
const auth = require("../middleware/auth");

const router = express.Router();

// Login
router.post(
  "/autoGenerate",
  unregistersValidator.getUser,
  unregistersCtrl.login
);

module.exports = router;
