import "./login.scss"
import { Link } from "react-router-dom"
export const Register = () => {
  return (
    <div className="login-conainer">
      <div className="login">
        <div className="login-part1">
          <h1>Register</h1>
          <p>Have Account ? <Link to="/">Sign in</Link></p>
        </div>
        <div className="login-part2">
          <div className="login-part21">
            <input type="text" placeholder="First Name..." />
            <input type="text" placeholder="Last Name..." />
          </div>
          <input type="text" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          <button>Register</button>
        </div>
        <button className="login-part3">
          <img src="" alt="" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}