const RegisterModel = require("../models/register.js")
const bcrypt = require("bcrypt");

//User will register =>
exports.userRegister = async (req, res) => {
  try {
    let { password, ...rest } = req.body;
    let saltRounds = 10;
    password = await bcrypt.hash(password, saltRounds);
    let userRegistered = await RegisterModel.create(
      {
        password,
        ...rest
      }
    )
 
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
    console.log(error, " <--- user not registered")
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

    let user = await RegisterModel.findOne({ email })
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
          massage: "wrong password"
        })

    res.json(
      {
        status: 200,
        massage: "user loggined"
      }
    )

  } catch (error) {
    console.log(error, "<--- user not loggined")
    res.json(
      {
        status: 500,
        massage: "Internal server"
      }
    )
  }
}