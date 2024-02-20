import "./login.scss"
import { Link } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
export const LoginPage = () => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });

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
      console.log("data send to database ", response)
    } catch (error) {
      console.log("data not sent", error)
    }
  }

  // login user => 
  const handleLogin = (e) => {
    e.preventDefault()
    try {
      sendTodataBase();
    } catch (error) {
      console.log("user not logined")
    }
  }

  return (
    <div className="login-conainer">
      <div className="login">
        <div className="login-part1">
          <h1>Login</h1>
          <p>No Account ? <Link to="/register">Sign up</Link></p>
        </div>
        <div className="login-part2">
          <input type="text" placeholder="Email..." value={login.email} name="email" onChange={(e) => handleChange(e)} />
          <input type="password" placeholder="Password..." value={login.password} name="password" onChange={(e) => handleChange(e)} />
          <button onClick={(e) => handleLogin(e)}>Login</button>
        </div>
        <button className="login-part3">
          <img src="" alt="" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}