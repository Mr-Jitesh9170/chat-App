import "../styles/dashboard.scss"
import ChatIcon from "../Assests/chatIcons.svg";
import SettingIcon from "../Assests/settingIcons.svg";
import ProfileIcon from "../Assests/profileIcons.svg";
import NotificationIcon from "../Assests/notificationIcons.svg";
import LogoutIcon from "../Assests/logout.svg"
import { Link, Outlet, useNavigate, Navigate } from "react-router-dom";



// All the icons =>
const ICONS = [
    {
        route: "/chit-chat/dashboard/profile",
        icons: ProfileIcon
    },
    {
        route: "/chit-chat/dashboard/chat",
        icons: ChatIcon
    },
    {
        route: "/chit-chat/dashboard/notification",
        icons: NotificationIcon
    },
    {
        route: "/chit-chat/dashboard/setting",
        icons: SettingIcon
    },
    {
        icons: LogoutIcon
    }
];
const DashBoard = () => {
    const navigate = useNavigate();
    const user = localStorage.getItem("token");

    // Logout =>
    const handleLogout = (i) => {
        if (i === 4) {
            localStorage.removeItem("token");
        }
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
                                        <img src="https://preview.keenthemes.com/metronic-v4/theme_rtl/assets/pages/media/profile/profile_user.jpg" alt="user-image" />
                                    </div>
                                    <div className="profile-name">Jitesh</div>
                                </div>
                                <div className="nav-icons">
                                    {
                                        ICONS.map((_, i) => {
                                            return <Link to={_?.route} onClick={() => handleLogout(i)}><img className="nav-img" src={_?.icons} alt="chat-icons" width={25} key={i} /></Link>
                                        })
                                    }
                                </div>
                            </div >
                            <div className="chat-profiles-right-container">
                                <Outlet />
                            </div>
                        </div >
                    ) : <Navigate to="/" />
            }
        </>
    )
}


export default DashBoard;


