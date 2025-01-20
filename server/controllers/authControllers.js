const RegisterModel = require("../models/register.js")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.userRegister = async (req, res, next) => {
  let { password, email, name, mobileNumber } = req.body;
  if (!password || !email || !name || !mobileNumber) {
    return res.status(400).json({ message: "Missing data!" })
  }
  try {
    let user = await RegisterModel.findOne({ $or: [{ email }, { mobileNumber }] });
    if (user) {
      return res.status(400).json({ message: "User already exists!" })
    }
    let saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);
    await RegisterModel.create({ password, email, name, mobileNumber })
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
    let token = await generateJwtToken({ _id: user._id, email: user.email })
    res.status(200).json({ massage: "User Logged in successfully!", results: { _id: user._id, token } })
  } catch (error) {
    next(error)
  }
}

const generateJwtToken = async (userData) => {
  if (!userData) {
    throw new Error("User data is required to generate a jwt token!")
  }
  if (!process.env.SECRET_KEY) {
    throw new Error("SECRET_KEY is not defined in environment variables!");
  }
  try {
    let token = await new Promise((resolve, reject) => {
      jwt.sign(userData, process.env.SECRET_KEY, { expiresIn: "1d" }, (err, token) => {
        if (err) {
          reject(new Error("Error generating jwt --> " + err.message))
        }
        resolve(token)
      })
    })
    return token;
  } catch (error) {
    console.log("Error generating jwt --> " + err.message)
    throw error
  }
}