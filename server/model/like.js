const mongoose = require("mongoose");
const baseModel = require("./base-model");
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
  ...baseModel,
  idea: {
    type: Schema.Types.ObjectId,
    ref: "Idea",
    required: true,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = likeSchema;
