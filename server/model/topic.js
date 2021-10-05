const mongoose = require("mongoose");
const baseModel = require("./base-model");
const Schema = mongoose.Schema;

const topicSchema = new mongoose.Schema({
  ...baseModel,
  topicContent: {
    type: String,
    required: true,
  },
  isAnonymous: {
    type: Boolean,
    required: true,
  },
  numberColumn: {
    type: Number,
    required: true,
  },
  maxLikePerUser: {
    type: Number,
    required: true,
  },
  oneLikePerIdea: {
    type: Boolean,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = topicSchema;
