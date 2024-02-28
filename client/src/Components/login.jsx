import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { useState } from "react"
import GoogleIcon from "../Assets/google.webp"
import EYE from "../Assets/view.png"
import "../SCSS/login.scss"
import { Toast } from "./toast"
export const LoginPage = ({ setRendor }) => {
  const [login, setLogin] = useState({
    email: "",
    password: ""
  });
  const [isShow, setShow] = useState(false)
  const [toast, setToast] = useState("")
  const navigate = useNavigate()

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
      let { data: { response } } = await axios.post("http://localhost:8080/chatApp/user/login", userData)
      setRendor(response)
    } catch (error) {
      console.log("data not sent", error)
    }
  }

  // Show/Hide =>
  const passwordHandle = () => {
    isShow ? setShow(false) : setShow(true)
  }

  // login user => 

  const handleLogin = (e) => {
    e.preventDefault()
    let { email, password } = login;
    if (email) {
      if (password) {
        sendTodataBase();
        navigate("/chats");
      }
      else {
        setToast("👉 password missing")
      }
    }
    else {
      setToast("👉 email missing")
    }
  }

  return (
    <div className="login-container">
      <Toast massage={toast} value={true} />
      <div className="login">
        <div className="login-part1">
          <h1>Login</h1>
          <p>No Account ? <Link to="/register">Sign up</Link></p>
        </div>
        <div className="login-part2">
          <input type="email" placeholder="Email..." value={login.email} name="email" onChange={(e) => handleChange(e)} />
          <div className="input">
            <input type={isShow ? "text" : "password"} placeholder="Password..." value={login.password} name="password" onChange={(e) => handleChange(e)} />
            <img src={EYE} alt="" width={15} onClick={passwordHandle} />
          </div>
          <button className="submitButton" onClick={(e) => handleLogin(e)}>Login</button>
        </div>
        <button className="login-part3">
          <img src={GoogleIcon} alt="" width={30} />
          <span>Continue with Google </span>
        </button>
      </div>
    </div>
  )
}