const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { Topic } = require("../model");

exports.createTopic = validate([
  body("topicContent").notEmpty().withMessage("topicContent cannot be empty"),
  body("isAnonymous").notEmpty().withMessage("isAnonymous cannot be empty"),
  body("numberColumn").notEmpty().withMessage("numberColumn cannot be empty"),
  body("maxLikePerUser")
    .notEmpty()
    .withMessage("maxLikePerUser cannot be empty"),
  body("oneLikePerIdea")
    .notEmpty()
    .withMessage("oneLikePerIdea cannot be empty"),
]);

exports.getTopic = [
  validate([validate.isValidObjectId(["params"], "topicId")]),
  async (req, res, next) => {
    const topicId = req.params.topicId;
    const topic = await Topic.findById(topicId);
    req.topic = topic;
    if (!topic) {
      return res.status(404).end();
    }
    next();
  },
  async (req, res, next) => {
    if (req.user.isTempUser && !req.topic.isAnonymous) {
      return res.status(401).end();
    }
    next();
  },
  //   async (req, res, next) => {
  //     if (req.user._id.toString() !== req.topic.user.toString()) {
  //       return res.status(403).end();
  //     }
  //     next();
  //   },
];

exports.updateTopic = [
  validate([
    validate.isValidObjectId(body("topicId")),
    // param('TopicId').isValidObjectId()
  ]),
  async (req, res, next) => {
    const topicId = req.body.topicId;
    const topic = await Topic.findById(topicId);
    req.topic = topic;
    if (!topic) {
      return res.status(404).end();
    }
    next();
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.topic.user.toString()) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteTopic = [
  validate([
    validate.isValidObjectId(["params"], "topicId"),
    // param('topicId').isValidObjectId()
  ]),
  async (req, res, next) => {
    const topicId = req.params.topicId;
    const topic = await Topic.findById(topicId);
    req.topic = topic;
    if (!topic) {
      return res.status(404).end();
    }
    next();
  },
  async (req, res, next) => {
    if (req.user._id.toString() !== req.topic.user.toString()) {
      return res.status(403).end();
    }
    next();
  },
];
