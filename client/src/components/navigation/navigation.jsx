import { navLiks } from "../../data/data";
import { Link } from "react-router-dom";
import "./navigation.scss"
import { ProfileIcon } from "../profileIcon/profileIcon";

const NavigationTabs = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
    }
    return (
        <div className="navigationContainer" >
            <Link to={"/chit-chat/dashboard/profile"} className="top">
                <ProfileIcon width={50} height={50} />
            </Link>
            {
                navLiks.map((navdata, index) => {
                    return (
                        <Link className="bottom" to={navdata?.route} onClick={index === 0 ? handleLogout : null} key={index}   >
                            {navdata.icons}
                        </Link>
                    )
                })
            }
        </div >
    )
}

export default NavigationTabs;