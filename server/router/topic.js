const express = require("express");
const topicCtrl = require("../controller/topic");
const auth = require("../middleware/auth");
const topicValidator = require("../validator/topic");

const router = express.Router();

// Create Topic
router.post("/", auth, topicValidator.createTopic, topicCtrl.createTopic);

// Get Topics
router.get("/", auth, topicCtrl.getTopics);

// Update Topic
router.put("/", auth, topicValidator.updateTopic, topicCtrl.updateTopic);

// Delete Topic
router.delete(
  "/:topicId",
  auth,
  topicValidator.deleteTopic,
  topicCtrl.deleteTopic
);

// Get all contents of a topic for frontend render
router.get("/:topicId", auth, topicValidator.getTopic, topicCtrl.getTopic);

module.exports = router;
