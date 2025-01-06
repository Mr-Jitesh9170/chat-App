import { ICONS } from "../../data/data";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navigation.scss"

const NavigationTabs = () => {
    let navigate = useNavigate();

    // Logout =>
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    }
    return (
        <div className="navigationContainer" >
            <div className="top">
                <div className="profile-image" style={{ border: "2px solid yellow" }}>
                    <img src={localStorage.getItem("profilePhoto")} alt="" />
                </div>
            </div>
            <div className="bottom">
                {
                    ICONS.map((_, index) => {
                        return (
                            <Link to={_?.route} onClick={index === 1 ? handleLogout : null} key={index} style={{ textDecoration: "none", position: 'relative' }} >
                                <img className="nav-img" src={_?.icons} alt="chat-icons" width={27} />
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default NavigationTabs;