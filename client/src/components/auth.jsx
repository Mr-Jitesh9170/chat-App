import { useState } from "react"
import "../styles/auth.scss"
import { userAuthorization } from "../APIs/api"
import { ToastNotifications } from "./Toastnotification"

const Authentication = () => {
  const [toastShow, setToastShow] = useState(false);
  const [inputData, setInputData] = useState(
    {
      name: "",
      email: "",
      password: ""
    }
  )
  const [auth, setAuth] = useState(true);




  
  // Login or Register =>
  const handleAuth = (e) => {
    e.preventDefault();
    auth ? setAuth(false) : setAuth(true)
  }

  // handle change =>
  const handleChange = (e) => {
    let { value, name } = e.target;
    if (name)
      setInputData({ ...inputData, [name]: value })
  }

  // Validation/Submit data  =>
  const handleSubmit = (e) => {
    e.preventDefault();
    let { name, email, password } = inputData
    let data;

    if (e.target.name === "register") {
      if (!name || !email || !password) {
        return alert("fill the blank feilds!")
      }
      data = { name, email, password }
      userAuthorization(data, "register");
    }
    else if (e.target.name === "login") {
      if (!email || !password) {
        return alert("fill the blank feilds!")
      }
      data = { email, password }
      userAuthorization(data, "login");
    }
  }

  return (
    <div className="authentication-container">

      <div className="toast-notification-container">
        <ToastNotifications toastMassages={"Hello I am the Toast Notifications!"} />
      </div>

      {
        auth ?
          <div className="container">
            <h1 className="auth-head">Login</h1>
            <input type="email" name="email" value={inputData.email} onChange={handleChange} placeholder="Email..." />
            <input type="password" name="password" value={inputData.password} onChange={handleChange} placeholder="Password..." />
            <button className="auth-btn" name="login" onClick={handleSubmit}>Submit</button>
            <a href="/" onClick={handleAuth}>Don't have an account? Register</a>
          </div>
          :
          < div className="container" action="/register" method="post">
            <h1 className="auth-head">Register</h1>
            <input type="text" name="name" placeholder="Name" value={inputData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={inputData.email} onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" value={inputData.password} onChange={handleChange} />
            <button className="auth-btn" name="register" onClick={handleSubmit} >Submit</button>
            <a href="/">have an account? Login</a>
          </div>
      }
    </div >
  )
}

export default Authentication;