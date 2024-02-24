import { useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import GoogleIcon from "../Assets/google.webp"
import EYE from "../Assets/view.png"
import "../SCSS/login.scss"

export const Register = () => {
  const [register, setRegister] = useState(
    {
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    }
  )
  const [isShow, setShow] = useState(false)
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

  // Show/Hide =>
  const passwordHandle = () => {
    isShow ? setShow(false) : setShow(true)
  }


  // handle submit =>
  const handleSubmit = (e) => {
    e.preventDefault();
    sendTodataBase();
  }

  return (
    <div className="login-container">
      <div className="login">
        <div className="login-part1">
          <h1>Register</h1>
          <p>Have an Account ? <Link to="/login">Sign in</Link></p>
        </div>
        <div className="login-part2">
          <div className="Name">
            <input type="text" placeholder="first name..." value={register.firstName} name="firstName" onChange={(e) => handleChange(e)} />
            <input type="text" placeholder="last name..." value={register.lastName} name="lastName" onChange={(e) => handleChange(e)} />
          </div>
          <input type="email" placeholder="Email..." value={register.email} name="email" onChange={(e) => handleChange(e)} />
          <div className="input">
            <input type={isShow ? "text" : "password"} placeholder="Password..." value={register.password} name="password" onChange={(e) => handleChange(e)} />
            <img src={EYE} alt="" width={15} onClick={passwordHandle} />
          </div>
          <button className="submitButton" onClick={(e) => handleSubmit(e)}>Register</button>
        </div>
        <button className="login-part3">
          <img src={GoogleIcon} alt="" width={30} />
          <span>Continue with Google </span>
        </button>
      </div>
    </div>
  )
}