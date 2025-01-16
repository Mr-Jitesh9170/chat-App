const RegisterModel = require("../models/register.js")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")


exports.userRegister = async (req, res, next) => {
  let { password, email, name } = req.body;
  if (!password || !email || !name) {
    return res.status(400).json({ message: "Missing data!" })
  }
  try {
    let user = await RegisterModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists!" })
    }
    let saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);
    await RegisterModel.create({ password, email, name })
    res.status(201).json({ message: "Users registered successfully!" })
  } catch (error) {
    next(error);
  }
}

exports.userLogin = async (req, res, next) => {
  let { email, password } = req.body;
  if (!password || !email) {
    return res.status(400).json({ message: "Missing data!" })
  }
  try {
    let user = await RegisterModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User is not registered!" })
    }
    let matched = await bcrypt.compare(password, user.password)
    if (!matched) {
      return res.status(400).json({ message: "Password is wrong!" })
    }

    res.status(200).json(
      {
        status: 200,
        massage: "user loggined",
        results: { _id: user._id, profilePhoto: user.profilePhoto }
      }
    )
  } catch (error) {
    next(error)
  }
}