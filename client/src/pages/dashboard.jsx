import "../styles/dashboard.scss"
import { Outlet, Navigate } from "react-router-dom";
import NavigationTabs from "../components/navigation/navigation";
import { ChatLists } from "../components/chatlists/chatlists";


const DashBoard = () => {
    let user = localStorage.getItem("token");

    return (
        <>
            {
                user ?
                    (
                        <div className="dashboard-container">
                            <NavigationTabs />
                            <div className="dashboard-right-container">
                                <ChatLists />
                                <div className="right-container">
                                    <Outlet />
                                </div>
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