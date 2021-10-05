const { Like, Idea, Column, Topic, User } = require("../model");
const columnCtrl = require("./column");

// Create Topic
exports.createTopic = async (req, res, next) => {
  try {
    // Process request
    const topic = new Topic(req.body);
    topic.user = req.user._id;
    topic.populate("user").execPopulate();
    await topic.save();
    for (i = 0; i < topic.numberColumn; i++) {
      const column = new Column({ topic: topic._id });
      column.populate("topic").execPopulate();
      await column.save();
    }
    res.status(201).json({
      topic,
    });
  } catch (err) {
    next(err);
  }
};

// Get all topics
exports.getTopics = async (req, res, next) => {
  try {
    // const { limit = 20, offset = 0, tag, author } = req.query;
    const { user } = req;
    const filter = {};

    // console.log(user);

    // if (tag) {
    //   filter.tagList = tag;
    // }

    if (user) {
      const userTemp = await User.findOne({
        _id: user._id,
      });
      filter.user = userTemp ? userTemp._id : null;
      filter.isRemove = false;
    }

    const topics = await Topic.find(filter)
      //   .populate("author")
      .sort({
        // -1 Desc，1 Asc
        updatedAt: -1,
      });

    res.status(200).json(topics);

    // const topicsCount = await Topic.countDocuments();

    // res.status(200).json({
    //   artilces,
    //   topicsCount,
    // });
  } catch (err) {
    next(err);
  }
};

// Update Topic
exports.updateTopic = async (req, res, next) => {
  try {
    const topicContent = req.body.topicContent;
    const topic = req.topic;
    topic.topicContent = topicContent;
    topic.updatedAt = Date.now();
    await topic.save();
    res.status(200).json({
      topic,
    });
  } catch (err) {
    next(err);
  }
};

// Delete Topic
exports.deleteTopic = async (req, res, next) => {
  try {
    const topic = req.topic;
    //   topic.title = bodyTopic.title || topic.title
    //   topic.description = bodyTopic.description || topic.description
    //   topic.body = bodyTopic.body || topic.body
    topic.isRemove = true;
    await topic.save();
    res.status(200).json({
      topic,
    });
  } catch (err) {
    next(err);
  }
};

// Get all contents of a Topic
exports.getTopic = async (req, res, next) => {
  try {
    // const { limit = 20, offset = 0, tag, author } = req.query;
    const { user, topic } = req;
    const filter = {};
    const topicEditable = !user.isTempUser;
    let returnTopic = null;
    returnTopic = {
      topicId: topic._id,
      topicContent: topic.topicContent,
      isAnonymous: topic.isAnonymous,
      numberColumn: topic.numberColumn,
      maxLikePerUser: topic.maxLikePerUser,
      oneLikePerIdea: topic.oneLikePerIdea,
      editable: topicEditable,
    };

    const columnEditable = !user.isTempUser;
    let topicColumns = new Array();
    let columns = await Column.find({ topic: topic._id });
    for (i = 0; i < columns.length; i++) {
      if (columns[i].isRemove == false) {
        var columnObj = null;
        columnObj = {
          isRemove: columns[i].isRemove,
          columnName: columns[i].columnName,
          columnId: columns[i]._id,
          topicId: columns[i].topic,
          createdAt: columns[i].createdAt,
          updatedAt: columns[i].updatedAt,
          editable: columnEditable,
        };
        let ideas = await Idea.find({ column: columns[i]._id });
        let columnIdeas = new Array();
        for (j = 0; j < ideas.length; j++) {
          if (ideas[j].isRemove == false) {
            var ideaObj = null;
            ideaObj = {
              isRemove: ideas[j].isRemove,
              description: ideas[j].description,
              ideaId: ideas[j]._id,
              columnId: ideas[j].column,
              createdAt: ideas[j].createdAt,
              updatedAt: ideas[j].updatedAt,
              editable: ideas[j].user.toString() == user._id.toString(),
              likeCount: ideas[j].likeCount,
            };
            let likes = await Like.find({ idea: ideas[j]._id });
            let haveLiked = new Array();
            let ideaLikes = new Array();
            for (k = 0; k < likes.length; k++) {
              if (likes[k].isRemove == false) {
                ideaLikes.push({ likeId: likes[k]._id });
                if (likes[k].user.toString() == req.user._id.toString()) {
                  haveLiked.push({ likeId: likes[k]._id });
                }
              }
            }
            ideaObj.haveLiked = haveLiked;
            ideaObj.ideaLikes = ideaLikes;

            let likeable = true;
            const topicLikes = await Like.find({
              topic: req.topic._id,
              user: req.user._id,
              isRemove: false,
            });
            if (req.topic.maxLikePerUser <= topicLikes.length) {
              likeable = false;
            }
            const thisIdeaLikes = await Like.find({
              topic: req.topic._id,
              user: req.user._id,
              idea: ideas[j]._id,
              isRemove: false,
            });
            if (req.topic.oneLikePerIdea && thisIdeaLikes.length >= 1) {
              likeable = false;
            }
            ideaObj.likeable = likeable;

            columnIdeas.push(ideaObj);
          }
        }
        //   obj.columnIdeas = [{ idea: "ok" }, { idea: "okay" }];
        columnIdeas.sort(function (a, b) {
          return b.likeCount - a.likeCount;
        });
        columnObj.columnIdeas = columnIdeas;
        topicColumns.push(columnObj);
      }
    }
    returnTopic.topicColumns = topicColumns;

    // console.log(user);

    // if (tag) {
    //   filter.tagList = tag;
    // }

    //   if (user) {
    //     const userTemp = await User.findOne({
    //       _id: user._id,
    //     });
    //     filter.user = userTemp ? userTemp._id : null;
    //     filter.isRemove = false;
    //   }

    //   const topics = await Topic.find(filter)
    //     //   .populate("author")
    //     .sort({
    //       // -1 倒序，1 升序
    //       updatedAt: -1,
    //     });

    res.status(200).json(returnTopic);

    // const topicsCount = await Topic.countDocuments();

    // res.status(200).json({
    //   artilces,
    //   topicsCount,
    // });
  } catch (err) {
    next(err);
  }
};
