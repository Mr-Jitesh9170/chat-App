import "../styles/auth.scss"
import { userAuthorization } from "../apis/auth"
import { ToastContainer, toast } from 'react-toastify';
import { alert } from "../utils/alert"
import { useInputChange } from "../hooks/inputChange";
import { Button } from "../components/button/button"
import { Link, useNavigate } from "react-router-dom";



export const Register = () => {
  const { input, handleChange } = useInputChange(
    {
      name: "",
      email: "",
      password: ""
    }
  );
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let { name, email, password } = input
    if (!name || !email || !password) {
      return toast.error("Missing field!", alert);
    }
    let data = { name, email, password }
    await userAuthorization(data, "register");
    navigate("/login")
  }
  
  return (
    <div className="authentication-container">
      < div className="container" action="/register" method="post">
        <h1 className="auth-head">Register</h1>
        <input type="text" name="name" placeholder="Name" value={input.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={input.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={input.password} onChange={handleChange} />
        <Button handleBtn={handleRegister} name={"Submit"} />
        <Link to={"/login"}  >have an account? Login</Link>
      </div>
      < ToastContainer />
    </div>
  )
}
