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

    console.log(result, "User Registerd..!")

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
    let { email: userEmail, password: userPassword } = await Register.findOne({ email: email })

    // Email and password varification =>
    if (email === userEmail) {
      if (password === userPassword) {
        console.log("user login successfully !")
        res.json({
          status: 200,
          massage: "user logined successfully "
        })

      } else {
        console.log("user password is wrong")

        res.json({
          status: 200,
          massage: "user password is wrong"
        })
      }

    } else {
      console.log("user not exists")
    }

  } catch (error) {
    console.log(error)
  }
}