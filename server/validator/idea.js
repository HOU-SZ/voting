const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { Idea, Column, Topic } = require("../model");

exports.createIdea = [
  validate([
    body("description").notEmpty().withMessage("description cannot be empty"),
    body("topicId").notEmpty().withMessage("topicId cannot be empty"),
    body("columnId").notEmpty().withMessage("columnId cannot be empty"),
  ]),
  validate([validate.isValidObjectId(body("topicId"))]),
  validate([validate.isValidObjectId(body("columnId"))]),
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
];

exports.updateIdea = [
  validate([
    body("ideaId").notEmpty().withMessage("ideaId cannot be empty"),
    body("description").notEmpty().withMessage("description cannot be empty"),
  ]),
  validate([validate.isValidObjectId(body("ideaId"))]),
  async (req, res, next) => {
    const ideaId = req.body.ideaId;
    const idea = await Idea.findById(ideaId);
    req.idea = idea;
    if (!idea) {
      return res.status(404).end();
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

exports.deleteIdea = [
  validate.isValidObjectId(["params"], "ideaId"),
  async (req, res, next) => {
    const ideaId = req.params.ideaId;
    const idea = await Idea.findById(ideaId);
    req.idea = idea;
    if (!idea) {
      return res.status(404).end();
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

exports.moveIdea = [
  validate([
    body("ideaId").notEmpty().withMessage("ideaId cannot be empty"),
    body("columnId").notEmpty().withMessage("columnId cannot be empty"),
  ]),
  validate([validate.isValidObjectId(body("ideaId"))]),
  validate([validate.isValidObjectId(body("columnId"))]),
  async (req, res, next) => {
    const ideaId = req.body.ideaId;
    const idea = await Idea.findById(ideaId);
    req.idea = idea;
    if (!idea) {
      return res.status(404).end();
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
