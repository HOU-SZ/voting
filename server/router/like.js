const express = require("express");
const likeCtrl = require("../controller/like");
const auth = require("../middleware/auth");
const likeValidator = require("../validator/like");

const router = express.Router();

// Create like
router.post("/", auth, likeValidator.createLike, likeCtrl.createLike);

// Delete like
router.delete("/:likeId", auth, likeValidator.deleteLike, likeCtrl.deleteLike);

module.exports = router;
