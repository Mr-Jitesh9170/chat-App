const RegisterModel = require("../models/register.js")
const bcrypt = require("bcrypt");
const mongoose = require("mongoose")


// Post , User will register =>
exports.userRegister = async (req, res) => {
  try {
    let { password, email, name } = req.body;
    let user = await RegisterModel.findOne({ email });
    if (user) { return res.send("user already exists") }
    let saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);
    let userRegistered = await RegisterModel.create({ password, email, name })
    let responseObject = userRegistered.toObject();
    delete responseObject.password;
    res.json(
      {
        status: 200,
        massage: "User registered",
        results: responseObject
      }
    )
  } catch (error) {
    console.log(error, " <--- user not registered");
    res.json(
      {
        status: 500,
        massage: "Internal server error"
      }
    )
  }
}

// User will login =>
exports.userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    let user = await RegisterModel.findOne({ email });
    if (!user)
      return res.json(
        {
          status: 200,
          massage: 'user not registered'
        }
      )

    let matched = await bcrypt.compare(password, user.password)
    if (!matched)
      return res.json(
        {
          status: 200,
          massage: "wrong password",
          token: ""
        })
    res.json(
      {
        status: 200,
        massage: "user loggined",
        results: { _id: user._id, profilePhoto: user.profilePhoto }
      }
    )

  } catch (error) {
    console.log(error, "<--- user not loggined");
    res.json(
      {
        status: 500,
        massage: "Internal server"
      }
    )
  }
}


// Get , retrieve all the registered user =>
exports.getUserRegister = async (req, res) => {
  try {

    let retrieveUsers = await RegisterModel.find().select("-password");
    res.json(
      {
        status: 200,
        massage: "all the registered user data retrieved",
        results: retrieveUsers
      }
    )

  } catch (error) {
    console.log(error, " <---- all registered user not retrieved")
    res.json(
      {
        status: 500,
        massage: "Internal server error"
      }
    )
  }
}
