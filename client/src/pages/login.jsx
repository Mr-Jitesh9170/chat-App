import { userAuthorization } from "../apis/auth"
import { useInputChange } from "../hooks/inputChange";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "./../components/button/button"
import { alert } from "../utils/alert"
import { Link, useNavigate } from "react-router-dom"
import "../styles/auth.scss"
import { GoogleAuth } from "../components/googleAuth/googleAuth";


export const Login = () => {
    const { input, handleChange } = useInputChange(
        {
            email: "",
            password: ""
        }
    );
    const navigate = useNavigate();

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
            navigate("/chit-chat/dashboard/profile");
        }
    }

    return (
        <div className="authentication-container">
            < div className="container" >
                <h1 className="auth-head">Login</h1>
                <input type="email" name="email" value={input.email} onChange={handleChange} placeholder="Email" />
                <input type="password" name="password" value={input.password} onChange={handleChange} placeholder="Password" />
                <Button handleBtn={handleLogin} name={"Submit"} />
                <GoogleAuth />
                <Link to={"/register"} >Don't have an account? Register</Link>
            </div >
            < ToastContainer />
        </div >
    )
}
