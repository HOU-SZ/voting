const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// User login
exports.login = async (req, res, next) => {
  try {
    // Generate token
    const user = req.user.toJSON();
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );

    // Send success response（including token and user info）
    delete user.password;
    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

// User register
exports.register = async (req, res, next) => {
  try {
    let user = new User(req.body);
    await user.save();

    user = user.toJSON();

    delete user.password;

    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

// Get current user
exports.getCurrentUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};
