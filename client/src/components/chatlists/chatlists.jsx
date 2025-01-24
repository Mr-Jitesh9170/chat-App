import "./chatlists.scss"
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { registerUserLists } from "../../apis/auth";
import { ProfileIcon } from "./../../components/profileIcon/profileIcon"
import { FaSearch } from "react-icons/fa";
import { dateToString } from "../../utils/timeAgo";
import useLoader from "../../hooks/loader";
import { socket } from "./../../pages/chat";
import { UserContext } from "../../context/userContext";


export const ChatLists = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const { setLoading, Loader, loading } = useLoader();

    let { user } = useContext(UserContext);

    const inputSearch = (e) => {
        let { value } = e.target;
        setSearch(value)
    }

    const handleRegisterUsers = async () => {
        try {
            let response = await registerUserLists();
            if (response) {
                setUsers(response?.results)
            }
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
            <div className="top">
                <h2 className="chit-chat">Chit-Chat</h2>
                <div className="input-search">
                    <FaSearch size={22} color="#66347F" />
                    <input type="text" placeholder="Search user for chat!" value={search} onChange={inputSearch} />
                </div>
            </div>
            <div className="chatLists">
                {
                    loading ? <Loader size={25} /> :
                        users?.filter(
                            (userDetails) =>
                                userDetails.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
                        ).map((userDetails, index) => {
                            return (
                                <Link className="users" to={`/chat/${userDetails._id}`} key={index}  >
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
        </div >
    )
}