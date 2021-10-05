const { Like, Idea, Column, Topic, User } = require("../model");

// Create Like
exports.createLike = async (req, res, next) => {
  try {
    // Process request
    const like = new Like(req.body);
    like.idea = req.body.ideaId;
    like.column = req.body.columnId;
    like.topic = req.body.topicId;
    like.user = req.user._id;

    like.populate("idea").execPopulate();
    like.populate("column").execPopulate();
    like.populate("topic").execPopulate();
    like.populate("user").execPopulate();
    await like.save();

    const idea = req.idea;
    idea.likeCount = idea.likeCount + 1;
    idea.updatedAt = Date.now();
    await idea.save();

    res.status(201).json({
      like,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Like
exports.deleteLike = async (req, res, next) => {
  try {
    const like = req.like;
    like.isRemove = true;
    await like.save();

    const idea = await Idea.findById(like.idea);
    idea.likeCount = idea.likeCount - 1;
    idea.updatedAt = Date.now();
    await idea.save();

    res.status(200).json({
      like,
    });
  } catch (err) {
    next(err);
  }
};
