import "./chatlists.scss"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUserLists } from "../../apis/auth";
import { ProfileIcon } from "./../../components/profileIcon/profileIcon"
import { FaSearch } from "react-icons/fa";
import { dateToString } from "../../utils/timeAgo";
import useLoader from "../../hooks/loader";
import { socket } from "./../../pages/chat";


export const ChatLists = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { setLoading, Loader, loading } = useLoader();

    let user = localStorage.getItem("token");

    const inputSearch = (e) => {
        let { value } = e.target;
        setSearch(value)
    }
 
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
                        loading ? <Loader size={25} /> :
                            users?.filter(
                                (userDetails) =>
                                    userDetails.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                            ).map((userDetails, index) => {
                                return (
                                    <Link className="users" to={`/chit-chat/dashboard/chat/${userDetails._id}`} key={index}  >
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
                                                <div className="user" >{userDetails.name}</div>
                                                <div className="lastMsg">{userDetails.lastMessage}</div>
                                            </div>
                                            <div className="lastChat">
                                                {userDetails.unreadMsg ? <span className="unreadMsgCount">{userDetails.unreadMsg}</span> : ""}
                                                <div className="lastMsgTime">{dateToString(userDetails.lastSeen)}</div>
                                            </div>
                                        </div>
                                    </Link>
                                )
                            })
                    }
                </div>
            </div>
        </div>
    )
}