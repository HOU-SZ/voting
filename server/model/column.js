const mongoose = require("mongoose");
const baseModel = require("./base-model");
const Schema = mongoose.Schema;

const columnSchema = new mongoose.Schema({
  ...baseModel,
  columnName: {
    type: String,
    default: "New Column",
  },
  topic: {
    type: Schema.Types.ObjectId,
    ref: "Topic",
    required: true,
  },
});

module.exports = columnSchema;
