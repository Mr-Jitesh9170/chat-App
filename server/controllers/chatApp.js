const Register = require("../models/register.js")



// Register User =>
exports.registerUser = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;
    // register data insertion =>
    let result = await Register.create({
      name: {
        firstName: firstName,
        lastName: lastName
      },
      email: email,
      password: password
    })
    // user response =>
    res.json(
      {
        status: 200,
        userData: {
          name: {
            firstName: firstName,
            lastName: lastName
          },
          email: email,
          password: password
        }
      }
    )

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
          response: results
        })
      } else {
        res.json({
          status: 200,
          massage: "user password is wrong",
          response: results
        })
      }

    } else {
      res.json({
        status: 200,
        massage: "user not registered",
        response: results
      })
    }

  } catch (error) {
    res.json(
      {
        status: 500,
        massage: "server error"
      }
    )
  }
}