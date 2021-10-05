const express = require("express");

const router = express.Router();

// User related routers
router.use("/users", require("./user"));

// Topic related routers
router.use("/topics", require("./topic"));

// Column related routers
router.use("/column", require("./column"));

// Idea related routers
router.use("/ideas", require("./idea"));

// Like related routers
router.use("/likes", require("./like"));

// Anonymous user related routers
router.use("/unregisters", require("./unregisters"));

module.exports = router;
