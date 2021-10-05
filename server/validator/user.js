const { body } = require("express-validator");
const validate = require("../middleware/validate");
const { User } = require("../model");
const md5 = require("../util/md5");

exports.register = validate([
  body("name")
    .notEmpty()
    .withMessage("name cannot be empty")
    .custom(async (name) => {
      const user = await User.findOne({ name });
      if (user) {
        return Promise.reject("name already exist");
      }
    }),
  body("alias").notEmpty().withMessage("Alias cannot be empty"),
  body("password").notEmpty().withMessage("Password cannot be empty"),

  body("emailAddress")
    .notEmpty()
    .withMessage("emailAddress cannot be empty")
    .isEmail()
    .withMessage("emailAddress format wrong")
    .bail()
    .custom(async (emailAddress) => {
      const user = await User.findOne({ emailAddress });
      if (user) {
        return Promise.reject("emailAddress already exist");
      }
    }),
]);

exports.login = [
  validate([
    body("emailAddress").notEmpty().withMessage("emailAddress cannot be empty"),
    body("password").notEmpty().withMessage("Password cannot be empty"),
  ]),
  validate([
    body("emailAddress").custom(async (emailAddress, { req }) => {
      const user = await User.findOne({ emailAddress }).select([
        "emailAddress",
        "name",
        "alias",
        "isTempUser",
        "password",
      ]);
      if (!user) {
        return Promise.reject("The user not exist.");
      }

      // Put the user data on req obj for follow-up middlewares consume
      req.user = user;
    }),
  ]),
  validate([
    body("password").custom(async (password, { req }) => {
      if (md5(password) !== req.user.password) {
        return Promise.reject("Password wrong!");
      }
    }),
  ]),
];
