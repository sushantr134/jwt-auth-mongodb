const User = require("../../../models/user/index");
const joi = require("joi");
const bcrypt = require("bcryptjs");

//validation
const registerUserSchema = {
  name: joi.string().required(),
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
  const userExists = await User.findOne({ email: req.body.email });
  if (userExists) {
    return res.status(400).json({ msg: "User Already Registered" });
  } else {
    const { error, value } = joi.validate(req.body, registerUserSchema);
    if (error) {
      res.status(400).json(error.details[0].message);
    } else {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      const registeredUser = new User({ ...value, password: hashedPassword });
      try {
        const savedUser = await registeredUser.save();
        res.status(200).json(savedUser);
      } catch (err) {
        if (err) throw err;
      }
    }
  }
};
