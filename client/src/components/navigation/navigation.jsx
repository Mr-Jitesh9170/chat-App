import { Link, useNavigate } from "react-router-dom";
import "./navigation.scss"
import { ProfileIcon } from "../profileIcon/profileIcon";
import { IoMdLogOut } from "react-icons/io";

const NavigationTabs = () => {
    const navigation = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("jwtToken");
        navigation("/login")
    }
    return (
        <div className="navigationContainer" >
            <Link to={"/"} className="top">
                <ProfileIcon width={50} height={50} />
            </Link>
            <button className="bottom" onClick={handleLogout}>
                <IoMdLogOut size={40} color="#fff" />
            </button>
        </div >
    )
}

export default NavigationTabs;