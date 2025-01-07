import { useState } from "react"
import "../styles/auth.scss"
import { userAuthorization } from "../apis/auth"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { alert } from "../utils/alert"
import { useInputChange } from "../hooks/inputChange";
import { Button } from "./../components/button/button"



const Authentication = () => {
  const navigation = useNavigate();
  const [auth, setAuth] = useState(true);
  const { input, handleChange } = useInputChange(
    {
      name: "",
      email: "",
      password: ""
    }
  );

  const handleLogin = async (e) => {
    e.preventDefault();
    let { email, password } = input
    if (!email || !password) {
      return toast.error("Missing field!", alert);
    }
    let data = { email, password }
    let { results: { _id: token, profilePhoto } } = await userAuthorization(data, "login")
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("profilePhoto", profilePhoto);
      navigation("/chit-chat/dashboard/profile");
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    let { name, email, password } = input
    if (!name || !email || !password) {
      return toast.error("Missing field!", alert);
    }
    let data = { name, email, password }
    await userAuthorization(data, "register");
    setAuth(true)
  }

  const handleAuth = (e) => {
    e.preventDefault()
    setAuth(!auth)
  }

  return (
    <>
      <div className="authentication-container">
        {
          auth ?
            (
              <div className="container">
                <h1 className="auth-head">Login</h1>
                <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={input.password} onChange={handleChange} placeholder="Password" />
                <Button handleBtn={handleLogin} name={"Submit"} />
                <a href="##" onClick={handleAuth}>Don't have an account? Register</a>
              </div>
            )
            :
            (
              < div className="container" action="/register" method="post">
                <h1 className="auth-head">Register</h1>
                <input type="text" name="name" placeholder="Name" value={input.name} onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" value={input.email} onChange={handleChange} />
                <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleChange} />
                <Button handleBtn={handleRegister} name={"Submit"} />
                <a href="##" onClick={handleAuth} >have an account? Login</a>
              </div>
            )
        }
      </div >
      <ToastContainer />
    </>
  )
}

export default Authentication;