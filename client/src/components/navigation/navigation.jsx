import { ICONS } from "../../data/data";
import { Link } from "react-router-dom";
import "./navigation.scss"

const NavigationTabs = () => {

    const handleLogout = () => {
        localStorage.removeItem("token");
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
                                {_.icons}
                            </Link>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default NavigationTabs;