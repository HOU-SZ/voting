const express = require("express");
const userCtrl = require("../controller/user");
const userValidator = require("../validator/user");
const auth = require("../middleware/auth");

const router = express.Router();

// User login
router.post("/login", userValidator.login, userCtrl.login);

// User register
router.post("/register", userValidator.register, userCtrl.register);

module.exports = router;
