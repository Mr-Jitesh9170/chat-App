import "./login.scss"

export const LoginPage = () => {
  return (
    <div className="login-conainer">
      <div className="login">
        <div className="login-part1">
          <h1>Login</h1>
          <p>No Account ? <a href="/">Sign up</a></p>
        </div>
        <div className="login-part2">
          <input type="text" placeholder="Email..." />
          <input type="password" placeholder="Password..." />
          <button>Login</button>
        </div>
        <button className="login-part3">
          <img src="" alt="" />
          Continue with Google
        </button>
      </div>
    </div>
  )
}