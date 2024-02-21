import { useState } from "react"
import "./login.scss"
import { Link } from "react-router-dom"
import axios from "axios"
export const Register = () => {
  const [register, setRegister] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  )

  let { firstName, lastName, email, password } = register;

  // handleOnchange =>
  const handleChange = (e) => {
    let { name, value } = e.target;
    setRegister((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }


  // register data to backend =>
  const sendTodataBase = async () => {
    try {
      let userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
      }
      let response = await axios.post("http://localhost:8080/chatApp/user/register", userData)
      console.log("data send to database ", response)
    } catch (error) {
      console.log("data not sent", error)
    }
  }

  // handle submit =>
  const handleSubmit = (e) => {
    e.preventDefault();
    sendTodataBase();
  }

  return (
    <div className="login-conainer">
      <div className="login">
        <div className="login-part1">
          <h1>Register</h1>
          <p>Have Account ? <Link to="/">Sign in</Link></p>
        </div>
        <div className="login-part2">
          <div className="login-part21">
            <input type="text" placeholder="First Name..." name="firstName" value={firstName} onChange={(e) => handleChange(e)} />
            <input type="text" placeholder="Last Name..." name="lastName" value={lastName} onChange={(e) => handleChange(e)} />
          </div>
          <input type="text" placeholder="Email..." name="email" value={email} onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password..." name="password" value={password} onChange={(e) => handleChange(e)} />
          <button onClick={(e) => handleSubmit(e)}>Register</button>
        </div>
        <button className="login-part3">
          <img src="" alt="" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}