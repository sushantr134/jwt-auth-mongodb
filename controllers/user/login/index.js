const User = require("../../../models/user/index");
const joi = require("joi");
const bcrypt = require("bcryptjs");

//validation
const loggedInUserSchema = {
  email: joi
    .string()
    .required()
    .email(),
  password: joi
    .string()
    .required()
    .min(6)
};

module.exports = async (req, res) => {
  const { error, value } = joi.validate(req.body, loggedInUserSchema);
  if (error) {
    return res.status(400).json(error.details[0].message);
  } else {
    const userExists = await User.findOne({ email: value.email });
    if (userExists) {
      bcrypt
        .compare(value.password, userExists.password)
        .then(loginStatus => (loginStatus ? res.status(200).json(userExists) : res.status(401).json({ msg: "Login Failed" })))
        .catch(err => {
          if (err) {
            console.log(err.message);
          }
        });
    }
  }
};
