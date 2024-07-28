import { useEffect, useState } from "react";
import "../styles/dashboard.scss"
import { ICONS } from "../data/AllData";
import { Link, Outlet, useNavigate, Navigate } from "react-router-dom";
import { registerUserLists } from "../APIs/api";
import { fetchCountUnreadMsg } from "../APIs/chatApi";
import { socket } from "../pages/chat";
import { notificationLists, notificationRead, sendNotifications } from "../APIs/notification";


const DashBoard = ({ setUser, notification, setNotification }) => {
    let navigate = useNavigate();
    let user = localStorage.getItem("token");
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [lastMsgCount, setLastMsgCount] = useState();

    // notification lists =>
    useEffect(() => {
        notificationLists('chit-chat/user/notification/lists', localStorage.getItem('token'), setNotification);
        notificationRead('chit-chat/user/notification/isRead', notification.notificationIds);
    }, [notification])

    // fetching register users =>
    useEffect(() => {
        registerUserLists(setUsers);
        socket.emit("isOnline", { isOnline: true, user })

        // Promise =>
        Promise.all(users.map(({ _id }) => {
            if (user !== _id) {
                let roomId = [user, _id].sort().join("");
                return (fetchCountUnreadMsg(`/user/unseen/massage/${roomId}`, _id));
            }
            return null;
        })).then((res) => {
            setLastMsgCount(res)
        }).catch((err) => {
            console.log(err, "<---- Error massage and massage count!");
        });

        return () => {
            socket.emit('isOnline', { isOnline: false, user });
        }
    }, []);


    // handleRoom =>
    const handleChangeRoom = (_) => {
        let roomId = [user, _._id].sort().join("");
        setUser((prevState) => {
            return { oldRoomId: prevState.roomId, roomId: roomId, userName: _.name, isActive: false, userPhoto: _.profilePhoto, participant: [user, _._id], isOnline: _.isOnline, timestamp: new Date(), lastSeen: _.lastSeen }
        })
    }

    // SEARCH CHAT USER =>
    const inputSearch = (e) => {
        let { value } = e.target;
        setSearch(value)
    }

    // Logout =>
    const handleLogout = () => {
        user = localStorage.removeItem("token");
        navigate("/");
    }

    return (
        <>
            {
                user ?
                    (
                        <div className="dashboard-container">
                            <div className="dashboard-left-container" >
                                <div className="left-top-container">
                                    <div className="profile-image" style={{ border: "2px solid yellow" }}>
                                        <img src={localStorage.getItem("profilePhoto")} alt="" />
                                    </div>
                                </div>
                                <div className="nav-icons">
                                    {
                                        ICONS.map((_, index) => {
                                            return (
                                                <Link to={_?.route} onClick={index === 2 ? handleLogout : null} key={index} style={{ textDecoration: "none", position: 'relative' }} >
                                                    <img className="nav-img" src={_?.icons} alt="chat-icons" width={27} />
                                                    {index == 1 && <span style={{ position: "absolute", top: "-10px", right: '-10px', color: "yellow", background: "black", borderRadius: "10px", padding: "4px", fontSize: "10px" }}>{notification.notiCount > 100 ? `${notification.notiCount}k` : notification.notiCount}</span>}
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
                                        <input type="text" placeholder="Search user for chat!" value={search} onChange={inputSearch} />
                                    </div>
                                    <div className="chat-lists">
                                        {
                                            users.map((_, index) => {
                                                // if (_.isOnline) {
                                                //     sendNotifications("chit-chat/user/notification/create", {
                                                //         userId: "6683909fe743a0f57dea85b1",
                                                //         toUser: "669cf56703675e2feae57739",
                                                //         notifyMsg: "I have sent you a mail!",
                                                //         isRead: true,
                                                //         timestamp: "2024-07-21T11:55:09.572+00:00"
                                                //     })
                                                // }
                                                if (_._id !== localStorage.getItem("token") && (_.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) {
                                                    let msgCounts = lastMsgCount[index]?.unReadCount !== 0 && lastMsgCount[index]?.unReadCount
                                                    return (
                                                        <Link to={`/chit-chat/dashboard/chat/${_._id}`} style={{ textDecoration: "none" }} key={index} onClick={() => handleChangeRoom(_)}>
                                                            <div className="users" >
                                                                <div className="users-profile" style={_.isOnline ? { border: "2px solid yellow" } : null}>
                                                                    <img src={_.profilePhoto} alt="" />
                                                                </div>
                                                                <div className="user-name">
                                                                    <div className="name">
                                                                        <b className="user" >{_.name}</b>
                                                                        <span className="chat-time" style={msgCounts ? { background: "yellow", width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 4px", color: "black", fontWeight: "bold", borderRadius: '50%' } : null}>{msgCounts}</span>
                                                                    </div>
                                                                    <div className="last-chat" style={{ color: "#9acd32" }}>{lastMsgCount[index]?.lastMassage}</div>
                                                                </div>
                                                            </div>
                                                        </Link>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="right-container">
                                    <div className="pages">
                                        <Outlet />
                                    </div>
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