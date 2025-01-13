import "./googleAuth.scss"
import GoogleImg from "./../../Assests/google.webp";


export const GoogleAuth = () => {
    return (
        <div className="googleLoginContainer">
            <div className="or">or</div>
            <button className="loginWithGoogle">
                <img width={30} src={GoogleImg} alt="" />
                <span>Login with Google</span>
            </button>
        </div>
    )
}
