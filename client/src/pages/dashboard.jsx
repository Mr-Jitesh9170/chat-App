import "../styles/dashboard.scss"
import NavigationTabs from "../components/navigation/navigation";
import { Navigate, Outlet } from "react-router-dom";
import { ChatLists } from "../components/chatlists/chatlists";
import { useContext } from "react";
import { UserContext } from "../context/userContext";


const DashBoard = () => {
    const { user } = useContext(UserContext)

    return (
        <>
            {
                user ?
                    <div className="dashboard-container" >
                        <div className="leftContainer">
                            <NavigationTabs />
                        </div>
                        <div className="midContainer">
                            <ChatLists />
                        </div>
                        <div className="rightContainer">
                            <Outlet />
                        </div>
                    </div >
                    :
                    <Navigate to={"/login"} />
            }
        </>
    )
}
export default DashBoard;