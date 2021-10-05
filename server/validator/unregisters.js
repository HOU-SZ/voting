const { verify } = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");

exports.getUser = async (req, res, next) => {
  // get jwt token from request header
  let token = req.headers["authorization"];
  token = token ? token.split("Bearer ")[1] : null;

  if (token) {
    try {
      // ignore expiration verification, decode the user and put on req object
      const decodedToken = await verify(token, jwtSecret, {
        ignoreExpiration: true,
      });
      req.user = await User.findById(decodedToken.userId);
      next();
    } catch (err) {
      return res.status(404).end();
    }
  }
  next();
};
