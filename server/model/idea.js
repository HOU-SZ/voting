const mongoose = require("mongoose");
const baseModel = require("./base-model");
const Schema = mongoose.Schema;

const ideaSchema = new mongoose.Schema({
  ...baseModel,
  description: {
    type: String,
    default: "New Column",
  },
  likeCount: {
    type: Number,
    default: 0,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
  column: {
    type: Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
});

module.exports = ideaSchema;
