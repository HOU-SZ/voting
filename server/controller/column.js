const { Column, Topic, User } = require("../model");

// Create Column
exports.createColumn = async (req, res, next) => {
  try {
    // Process request
    const column = new Column(req.body);
    column.topic = req.body.topicId;
    column.populate("topic").execPopulate();
    await column.save();

    const topic = req.topic;
    topic.numberColumn = topic.numberColumn + 1;
    topic.updatedAt = Date.now();
    await topic.save();

    res.status(201).json({
      column,
    });
  } catch (err) {
    next(err);
  }
};

// Get all columns belonging to a specific topic
exports.getColumns = async (req, res, next) => {
  try {
    // const { limit = 20, offset = 0, tag, author } = req.query;
    const { topic } = req;
    const filter = {};

    // console.log(user);

    // if (tag) {
    //   filter.tagList = tag;
    // }

    if (topic) {
      const topicTemp = await Topic.findOne({
        _id: topic._id,
      });
      filter.topic = topicTemp ? topicTemp._id : null;
      filter.isRemove = false;
    }

    const columns = await Column.find(filter).populate("topic").sort({
      // -1 Desc，1 Asc
      createdAt: -1,
    });

    res.status(200).json(columns);

    // const topicsCount = await Topic.countDocuments();

    // res.status(200).json({
    //   artilces,
    //   topicsCount,
    // });
  } catch (err) {
    next(err);
  }
};

// Update Column
exports.updateColumn = async (req, res, next) => {
  try {
    const columnName = req.body.columnName;
    const column = req.column;
    column.columnName = columnName;
    column.updatedAt = Date.now();
    await column.save();
    res.status(200).json({
      column,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Column
exports.deleteColumn = async (req, res, next) => {
  try {
    const column = req.column;
    //   topic.title = bodyTopic.title || topic.title
    //   topic.description = bodyTopic.description || topic.description
    //   topic.body = bodyTopic.body || topic.body
    column.isRemove = true;
    await column.save();

    const topicId = column.topic;
    const topic = await Topic.findById(topicId);
    topic.numberColumn = topic.numberColumn - 1;
    topic.updatedAt = Date.now();
    await topic.save();

    res.status(200).json({
      column,
    });
  } catch (err) {
    next(err);
  }
};
