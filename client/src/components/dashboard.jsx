import { useEffect, useState } from "react";
import "../styles/dashboard.scss"
import { ICONS } from "../data/AllData";
import { Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import { registerUserLists } from "../APIs/api";

const DashBoard = () => {
    let user = localStorage.getItem("token");
    let navigate = useNavigate()
    // Searching Users =>
    const [search, setSearch] = useState("");
    // ChatUser Lists=>
    const [users, setUsers] = useState([]);
    // SEARCH CHAT USER =>
    const inputSearch = (e) => {
        let { value } = e.target;
        setSearch(value)
    }
    // Logout =>
    const handleLogout = (index) => {
        user = localStorage.removeItem("token");
        navigate("/");
    }
    useEffect(() => {
        // Registered User Lists =>
        registerUserLists(setUsers)
    }, [])
    return (
        <>
            {
                user ?
                    (
                        <div className="dashboard-container">
                            <div className="dashboard-left-container" >
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
                                                    <img className="nav-img" src={_?.icons} alt="chat-icons" width={27} />
                                                </Link>
                                            )
                                        })
                                    }
                                </div>
                            </div >
                            <div className="dashboard-right-container">
                                <div className="left-container">
                                    <h2 className="chit-chat">Chit-Chat</h2>
                                    <div className="input-search">
                                        <img src="" alt="" />
                                        <input type="text" placeholder="Search user for chat...." value={search} onChange={inputSearch} />
                                    </div>
                                    <div className="chat-lists">
                                        {
                                            users.map((_, index) => {
                                                if (_.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                                                    return (
                                                        <div className="users" key={index} >
                                                            <div className="users-profile">
                                                                <img src={_.profilePhoto} alt="" />
                                                            </div>
                                                            <div className="user-name"  >
                                                                <div className="name">
                                                                    <b className="user" >{_.name}</b>
                                                                    <span className="chat-time">9m</span>
                                                                </div>
                                                                <div className="last-chat">{_._id}</div>
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }
                                            )
                                        }
                                    </div>
                                </div>
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