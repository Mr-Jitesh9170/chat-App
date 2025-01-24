import { userAuthorization } from "../apis/auth"
import { useInputChange } from "../hooks/inputChange";
import { ToastContainer, toast } from 'react-toastify';
import { Button } from "./../components/button/button"
import { alert } from "../utils/alert"
import { Link, useNavigate } from "react-router-dom"
import "../styles/auth.scss"
import { GoogleAuth } from "../components/googleAuth/googleAuth";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


export const Login = () => {
    const { setUser } = useContext(UserContext)
    const { input, handleChange } = useInputChange(
        {
            email: "",
            password: ""
        }
    );
    const navigate = useNavigate();
    const handleLogin = async (e) => {
        e.preventDefault();
        let { email, password } = input;
        if (!email || !password) {
            return toast.warning("Missing field!", alert);
        }
        try {
            let data = { email, password }
            let { results } = await userAuthorization(data, "/login");
            if (results) {
                let jwtToken = results?.token;
                let token = results?._id
                localStorage.setItem("jwtToken", jwtToken);
                localStorage.setItem("token", token);
                setUser(results._id)
                return navigate("/");
            }
            toast.error(`Something went wrong!`, alert)
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message, alert)
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
