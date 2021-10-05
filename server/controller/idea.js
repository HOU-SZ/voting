const { Idea, Column, Topic, User } = require("../model");

// Create Idea
exports.createIdea = async (req, res, next) => {
  try {
    // Process request
    const idea = new Idea(req.body);
    idea.column = req.body.columnId;
    idea.topic = req.body.topicId;
    idea.user = req.user._id;

    idea.populate("column").execPopulate();
    idea.populate("topic").execPopulate();
    idea.populate("user").execPopulate();
    await idea.save();
    res.status(201).json({
      idea,
    });
  } catch (err) {
    next(err);
  }
};

// Update Idea
exports.updateIdea = async (req, res, next) => {
  try {
    const description = req.body.description;
    const idea = req.idea;
    idea.description = description;
    idea.updatedAt = Date.now();
    await idea.save();
    res.status(200).json({
      idea,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Idea
exports.deleteIdea = async (req, res, next) => {
  try {
    const idea = req.idea;
    idea.isRemove = true;
    await idea.save();
    res.status(200).json({
      idea,
    });
  } catch (err) {
    next(err);
  }
};

// Move Idea
exports.moveIdea = async (req, res, next) => {
  try {
    const columnId = req.body.columnId;
    const idea = req.idea;
    idea.column = columnId;
    idea.updatedAt = Date.now();
    await idea.save();
    res.status(200).json({
      idea,
    });
  } catch (err) {
    next(err);
  }
};
