import "../styles/dashboard.scss"
import { ICONS } from "../data/AllData";
import { Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import { useState } from "react";

const DashBoard = () => {
    const [userProfile, setUserProfile] = useState();
    let user = localStorage.getItem("token");
    let navigate = useNavigate()


    // Logout =>
    const handleLogout = (index) => {
        user = localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <>
            {
                user ?
                    (
                        <div className="chat-profiles-container">
                            <div className="chat-profiles-left-container" >
                                <div className="left-top-container">
                                    <div className="profile-image">
                                        <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="user-image" />
                                    </div>
                                </div>
                                <div className="nav-icons">
                                    {
                                        ICONS.map((_, index) => {
                                            return (
                                                <Link to={_?.route} onClick={index === 4 ? handleLogout : null} key={index} >
                                                    <img className="nav-img" src={_?.icons} alt="chat-icons" width={25} />
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div >
                            <div className="chat-profiles-right-container">
                                <Outlet />
                            </div>
                        </div >
                    )
                    :
                    (
                        <Navigate to="/" />
                    )
            }
        </>
    )
}


export default DashBoard;


