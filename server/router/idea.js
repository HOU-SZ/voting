const express = require("express");
const ideaCtrl = require("../controller/idea");
const auth = require("../middleware/auth");
const ideaValidator = require("../validator/idea");

const router = express.Router();

// Create idea
router.post("/", auth, ideaValidator.createIdea, ideaCtrl.createIdea);

// Update idea
router.put("/", auth, ideaValidator.updateIdea, ideaCtrl.updateIdea);

// Delete idea
router.delete("/:ideaId", auth, ideaValidator.deleteIdea, ideaCtrl.deleteIdea);

// Move idea
router.put("/column", auth, ideaValidator.moveIdea, ideaCtrl.moveIdea);

module.exports = router;
