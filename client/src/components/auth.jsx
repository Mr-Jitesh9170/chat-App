import { useState } from "react"
import "../styles/auth.scss"
const Authentication = () => {
  const [auth, setAuth] = useState(true)

  // Authentication page =>
  const handleAuth = (e) => {
    e.preventDefault();
    auth ? setAuth(false) : setAuth(true)
  }

  // handle change =>

  const handleChange = (e) => {
    let { value, name } = e.target;
    
   }

  return (
    <div className="authentication-container">
      {
        auth ?
          <div className="container">
            <h1 className="auth-head">Login</h1>
            <input type="email" name="email" placeholder="Email..." onChange={handleChange} />
            <input type="password" name="password" placeholder="Password..." onChange={handleChange} />
            <button className="auth-btn">Submit</button>
            <a href="/" onClick={handleAuth}>Don't have an account? Register</a>
          </div>
          :
          < div className="container" action="/register" method="post">
            <h1 className="auth-head">Register</h1>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <button className="auth-btn">Submit</button>
            <a href="/">have an account? Login</a>
          </div>
      }
    </div >
  )
}

export default Authentication;