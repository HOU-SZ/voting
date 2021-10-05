const mongoose = require("mongoose");
const { dbUri } = require("../config/config.default");

// Connect to mongodb database
mongoose.connect(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// Connection failure
db.on("error", (err) => {
  console.log("MongoDB 数据库连接失败", err);
});

// Connection success
db.once("open", function () {
  console.log("MongoDB 数据库连接成功");
});

// Export model class
module.exports = {
  User: mongoose.model("User", require("./user")),
  Topic: mongoose.model("Topic", require("./topic")),
  Column: mongoose.model("Column", require("./column")),
  Idea: mongoose.model("Idea", require("./idea")),
  Like: mongoose.model("Like", require("./like")),
};
