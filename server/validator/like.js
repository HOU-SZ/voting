const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { Like, Idea, Column, Topic } = require("../model");

exports.createLike = [
  validate([
    body("ideaId").notEmpty().withMessage("ideaId cannot be empty"),
    body("columnId").notEmpty().withMessage("columnId cannot be empty"),
    body("topicId").notEmpty().withMessage("topicId cannot be empty"),
  ]),
  validate([validate.isValidObjectId(body("ideaId"))]),
  validate([validate.isValidObjectId(body("columnId"))]),
  validate([validate.isValidObjectId(body("topicId"))]),

  async (req, res, next) => {
    const ideaId = req.body.ideaId;
    const idea = await Idea.findById(ideaId);
    req.idea = idea;
    if (!idea) {
      return res.status(404).end();
    }
    next();
  },
  async (req, res, next) => {
    const columnId = req.body.columnId;
    const column = await Column.findById(columnId);
    req.column = column;
    if (!column) {
      return res.status(404).end();
    }
    next();
  },
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
    const topicLikes = await Like.find({
      topic: req.topic._id,
      user: req.user._id,
      isRemove: false,
    });
    if (req.topic.maxLikePerUser <= topicLikes.length) {
      return res.status(403).end();
    }
    const ideaLikes = await Like.find({
      topic: req.topic._id,
      user: req.user._id,
      idea: req.idea._id,
      isRemove: false,
    });
    if (req.topic.oneLikePerIdea && ideaLikes.length >= 1) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteLike = [
  validate.isValidObjectId(["params"], "likeId"),
  async (req, res, next) => {
    const likeId = req.params.likeId;
    const like = await Like.findById(likeId);
    req.like = like;
    if (!like) {
      return res.status(404).end();
    }
    next();
  },
];
