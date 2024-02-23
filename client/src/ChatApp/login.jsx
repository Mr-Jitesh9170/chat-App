import "./login.scss"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import GoogleIcon from "./google.webp"

export const LoginPage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();
  const [fetched, setFetched] = useState();

  // input onchange property =>
  const handleChange = (e) => {
    let { name, value } = e.target;
    setLogin((prevState) => ({
      ...prevState,
      [name]: value
    }));
  }

  // login data to backend =>
  const sendTodataBase = async () => {
    try {
      let { email, password } = login;
      let userData = {
        email: email,
        password: password
      }
      let response = await axios.post("http://localhost:8080/chatApp/user/login", userData)
      setFetched(response)
    } catch (error) {
      console.log("data not sent", error)
    }
  }

  // login user => 
  const handleLogin = (e) => {
    e.preventDefault()
    sendTodataBase();
    // navigate("/Chats")
    console.log("user id", fetched)
  }

  return (
    <div className="login-conainer">
      <div className="login">
        <div className="login-part1">
          <h1>Login</h1>
          <p>No Account ? <Link to="/register">Sign up</Link></p>
        </div>
        <div className="login-part2">
          <input type="email" placeholder="Email..." value={login.email} name="email" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password..." value={login.password} name="password" onChange={(e) => handleChange(e)} />
          <button onClick={(e) => handleLogin(e)}>Login</button>
        </div>
        <button className="login-part3">
          <img src={GoogleIcon} width={30} alt="" />
          <span>Continue with Google </span>
        </button>
      </div>
    </div>
  )
}