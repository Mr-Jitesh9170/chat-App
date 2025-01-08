import "./chatlists.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUserLists } from "../../apis/auth";
import { fetchCountUnreadMsg } from "../../apis/chatApi";
import { socket } from "./../../pages/chat";
import { ProfileIcon } from "./../../components/profileIcon/profileIcon"
import { FaSearch } from "react-icons/fa";
import { dateToString } from "../../utils/timeAgo";
import useLoader from "../../hooks/loader";

export const ChatLists = ({ setUser }) => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [lastMsgCount, setLastMsgCount] = useState();
    const { setLoading, Loader, loading } = useLoader();

    let user = localStorage.getItem("token");

    const inputSearch = (e) => {
        let { value } = e.target;
        setSearch(value)
    }

    const handleChangeRoom = (_) => {
        let roomId = [user, _._id].sort().join("");
        setUser((prevState) => {
            return {
                oldRoomId: prevState.roomId,
                roomId: roomId,
                userName: _.name,
                isActive: false,
                userPhoto: _.profilePhoto,
                participant: [user, _._id],
                isOnline: _.isOnline,
                timestamp: new Date(),
                lastSeen: _.lastSeen
            }
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
        console.log(err);
    });



    const handleRegisterUsers = async () => {
        try {
            let response = await registerUserLists();
            setUsers(response?.results)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        handleRegisterUsers();
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
                    <FaSearch size={22} color="#66347F" />
                    <input type="text" placeholder="Search user for chat!" value={search} onChange={inputSearch} />
                </div>
                <div className="chatLists">
                    {
                        loading ? <Loader /> :
                            users.map((userDetails, index) => {
                                if (userDetails._id !== localStorage.getItem("token") && (userDetails.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))) {
                                    let msgCounts = lastMsgCount[index]?.unReadCount !== 0 && lastMsgCount[index]?.unReadCount
                                    return (
                                        <Link className="users" to={`/chit-chat/dashboard/chat/${userDetails._id}`} key={index} onClick={() => handleChangeRoom(userDetails)}>
                                            <div className="userProfile" >
                                                <ProfileIcon img={userDetails.profilePhoto} />
                                                {
                                                    userDetails.isOnline && (
                                                        <div className="isOnline"></div>
                                                    )
                                                }
                                            </div>
                                            <div className="userDetails">
                                                <div className="name">
                                                    <b className="user" >{userDetails.name}</b>
                                                    {
                                                        msgCounts && <span className="chat-time">{msgCounts > 9 ? "9+" : msgCounts}</span>
                                                    }
                                                </div>
                                                <div className="lastChat">
                                                    <div className="lastMsg">
                                                        {lastMsgCount[index]?.lastMassage}
                                                    </div>
                                                    <div className="lastMsgTime">{dateToString(userDetails.lastSeen)}</div>
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