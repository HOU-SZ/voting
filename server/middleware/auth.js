const { verify } = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");
const { User } = require("../model");

module.exports = async (req, res, next) => {
  // Get jwt token from request header
  let token = req.headers["authorization"];
  token = token ? token.split("Bearer ")[1] : null;

  if (!token) {
    return res.status(401).end();
  }

  try {
    // verify token
    const decodedToken = await verify(token, jwtSecret);
    // valid -> read corresponding user information and put it on req object,
    //        then execute continue
    req.user = await User.findById(decodedToken.userId);
    next();
  } catch (err) {
    // invalid -> send 401
    return res.status(401).end();
  }
};
