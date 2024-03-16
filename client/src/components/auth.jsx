import { useState } from "react"
import "../styles/auth.scss"
const Authentication = () => {
  const [auth, setAuth] = useState(true)

  // Authentication page =>
  const handleAuth = (e) => {
    e.preventDefault();
    auth ? setAuth(false) : setAuth(true)
  }

  return (
    <div className="authentication-container">
      {
        auth ?
          <form className="container" action="/login" method="post">
            <h1 className="auth-head">Login</h1>
            <input type="email" name="email" placeholder="Email..." />
            <input type="password" name="password" placeholder="Password..." />
            <button className="auth-btn">Submit</button>
            <a href="/" onClick={handleAuth}>Don't have an account? Register</a>
          </form>
          :
          < form className="container" action="/register" method="post">
            <h1 className="auth-head">Register</h1>
            <input type="text" name="name" placeholder="Name" />
            <input type="email" name="email" placeholder="Email" />
            <input type="password" name="password" placeholder="Password" />
            <button className="auth-btn">Submit</button>
            <a href="/">have an account? Login</a>
          </form>
      }
    </div >
  )
}

export default Authentication;