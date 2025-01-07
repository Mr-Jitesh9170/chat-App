import "./chatlists.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUserLists } from "../../apis/auth";
import { fetchCountUnreadMsg } from "../../apis/chatApi";
import { socket } from "./../../pages/chat";
import { ProfileIcon } from "./../../components/profileIcon/profileIcon"


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
            <div className="bottom">
                <div className="input-search">
                    <img src="" alt="" />
                    <input type="text" placeholder="Search user for chat!" value={search} onChange={inputSearch} />
                </div>
                <div className="chatLists">
                    {
                        users.map((_, index) => {
                            if (_._id !== localStorage.getItem("token") && (_.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) {
                                let msgCounts = lastMsgCount[index]?.unReadCount !== 0 && lastMsgCount[index]?.unReadCount
                                return (
                                    <Link className="users" to={`/chit-chat/dashboard/chat/${_._id}`} key={index} onClick={() => handleChangeRoom(_)}>
                                        <div className="users-profile" style={_.isOnline ? { border: "2px solid yellow" } : null}>
                                            <ProfileIcon img={_.profilePhoto} />
                                        </div>
                                        <div className="user-name">
                                            <div className="name">
                                                <b className="user" >{_.name}</b>
                                                <span className="chat-time">{msgCounts}</span>
                                            </div>
                                            <div className="last-chat">
                                                <div className="lastMsg">
                                                    {lastMsgCount[index]?.lastMassage}
                                                </div>
                                                <div className="lastMsgTime">12:10 pm</div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            }
                        })
                    }
                </div>
            </div>
        </div>
    )
}