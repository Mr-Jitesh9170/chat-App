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