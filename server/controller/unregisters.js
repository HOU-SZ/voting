const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// Anonymous user login
exports.login = async (req, res, next) => {
  try {
    if (!req.user) {
      // 1. Create a anonymous user ans save to database
      const usersCount = await User.countDocuments();
      const emailAddress = usersCount + "@tempUser.com";
      let tempUser = new User({
        name: "tempUser" + usersCount,
        alias: "tempUser" + usersCount,
        emailAddress: emailAddress,
        password: "tempUser",
        isTempUser: true,
      });
      await tempUser.save();
      // 2. Generate token
      let user = await User.findOne({ emailAddress }).select([
        "_id",
        "emailAddress",
        "name",
        "alias",
        "isTempUser",
        "password",
      ]);
      req.user = user;
    }

    const user = req.user.toJSON();
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24 * 60,
      }
    );

    // 3. Send success response（including token and user info）
    delete user.password;
    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};
