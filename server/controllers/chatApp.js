const Register = require("../models/register.js")

// Register User =>
exports.registerUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    let result = await Register.create({
      name: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })
    res.json(
      {
        status: 200,
        massage: "User Registered successfully!",
        response: result
      }
    )
    console.log(" the data is => ", req.body);
  } catch (error) {
    console.log("user not registerd");
  }
}



// Login user =>
exports.loginUser = async (req, res) => {
  try {
    // user email and password =>
    let { email, password } = req.body;

    // user email and password from database =>
    let results = await Register.findOne({ email: email })
    if (results.email === email) {
      if (password === results.password) {
        res.json({
          status: 200,
          massage: "user logined successfully",
          response: true
        })
      } else {
        res.json({
          status: 200,
          massage: "user password is wrong",
          response: false
        })
      }

    } else {
      res.json({
        status: 200,
        massage: "user not registered",
        response: false
      })
    }

  } catch (error) {
    res.json(
      {
        status: 500,
        massage: "server error",
        response: false
      }
    )
  }
}