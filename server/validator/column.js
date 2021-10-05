const { body, param } = require("express-validator");
const validate = require("../middleware/validate");
const { Column, Topic } = require("../model");

exports.createColumn = [
  validate([body("topicId").notEmpty().withMessage("topicId cannot be empty")]),
  validate([validate.isValidObjectId(body("topicId"))]),
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

exports.getColumns = [
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
];

exports.updateColumn = [
  validate([
    body("columnId").notEmpty().withMessage("columnId cannot be empty"),
    body("columnName").notEmpty().withMessage("columnName cannot be empty"),
    body("topicId").notEmpty().withMessage("topicId cannot be empty"),
  ]),
  validate([validate.isValidObjectId(body("columnId"))]),
  validate([validate.isValidObjectId(body("topicId"))]),
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
  //   async (req, res, next) => {
  //     if (req.user._id.toString() !== req.topic.user.toString()) {
  //       return res.status(403).end();
  //     }
  //     next();
  //   },
];

exports.deleteColumn = [
  validate.isValidObjectId(["params"], "columnId"),
  async (req, res, next) => {
    const columnId = req.params.columnId;
    const column = await Column.findById(columnId);
    req.column = column;
    if (!column) {
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
