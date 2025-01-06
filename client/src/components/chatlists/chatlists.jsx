import "./chatlists.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUserLists } from "../../apis/auth";
import { fetchCountUnreadMsg } from "../../apis/chatApi";
import { socket } from  "./../../pages/chat";

export const ChatLists = ({ setUser }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [lastMsgCount, setLastMsgCount] = useState();

    let user = localStorage.getItem("token");

    const inputSearch = (e) => {
        let { value } = e.target;
        setSearch(value)
    }

    const handleChangeRoom = (_) => {
        let roomId = [user, _._id].sort().join("");
        setUser((prevState) => {
            return { oldRoomId: prevState.roomId, roomId: roomId, userName: _.name, isActive: false, userPhoto: _.profilePhoto, participant: [user, _._id], isOnline: _.isOnline, timestamp: new Date(), lastSeen: _.lastSeen }
        })
    }
 
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


    useEffect(() => {
        registerUserLists(setUsers);
        socket.emit("isOnline", { isOnline: true, user })
        return () => {
            socket.emit('isOnline', { isOnline: false, user });
        }
    }, []);


    return (
        <div className="ChatListsContainer">
            <h2 className="chit-chat">Chit-Chat</h2>
            <div className="input-search">
                <img src="" alt="" />
                <input type="text" placeholder="Search user for chat!" value={search} onChange={inputSearch} />
            </div>
            <div className="chat-lists">
                {
                    users.map((_, index) => {
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
    )
}