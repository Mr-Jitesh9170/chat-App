import { useEffect, useState } from "react";
import "../styles/chat.scss";
import Send from "../Assests/send.svg";
import { registerUserLists } from "../APIs/api";
import io from "socket.io-client";
const socket = io("http://localhost:8080");

const Chat = () => {
  // Searching Users =>
  const [search, setSearch] = useState("");
  // ChatUser Lists=>
  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("")
  const [save, setSave] = useState([
    {
      id: null,
      massage: null
    }
  ]);
  const [chatData, setChatData] = useState({
    isChatShow: false,
    userName: "",
    userStatus: "Active",
    userProfilePhoto: "",
    room: ""
  })
  // server response chat massage =>
  socket.on("chat", ({ id, massage }) => {
    setSave([...save, { id, massage }])
  })

  // handle room =>
  const handleUser = (roomId, name, profilePhoto) => {
    setChatData({
      ...chatData, room: roomId, isChatShow: true, userName: name, userProfilePhoto: profilePhoto
    })
  }
  // Room joining & Room leaving =>
  useEffect(() => {
    // Registered User Lists =>
    registerUserLists(setUsers)
    socket.emit("roomJoin", chatData.room);
    return () => {
      socket.emit("roomLeave", chatData.room)
    }
  }, [chatData.room])

  //SEND MASSAGES =>
  const handleSend = () => {
    let date = new Date();
    if (input !== undefined && input.trim() !== "")
      socket.emit("chat", chatData.room, { input, date });
    setInput("")
  }

  //INPUT MASSAGES =>
  const handleChange = (e) => {
    let { value } = e.target;
    setInput(value)
  }

  // SEARCH CHAT USER =>
  const inputSearch = (e) => {
    let { value } = e.target;
    setSearch(value)
  }

  // user conneted =>
  useEffect(() => {
    socket.on("connection", () => {
      console.log("A user connected!")
    })
    return () => {
      socket.disconnect();
    }
  }, [])
  return (
    <>
      <div className="chat-container">
        <div className="left-chat-container">
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
                    <div className="users" key={index} onClick={() => handleUser(_._id, _.name, _.profilePhoto)}>
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

        {
          chatData.isChatShow && (
            <div className="right-chat-container">
              {/* ===================== TOP - CHAT ===================================> */}
              <div className="right-chat-top">
                <div className="right-chat-left">
                  <div className="users-profile">
                    <img src={chatData.userProfilePhoto} alt="" />
                  </div>
                  <h2 className="user-name-mi">{chatData.userName}</h2>
                </div>
              </div>
              {/* ===================== MIDDLE - CHAT ===================================> */}
              <div className="right-chat-mid" >
                {
                  save.map((_) => {
                    if (socket.id === _.id) {
                      return <div className="massage user1-chats">{_?.massage?.input}</div>
                    } else {
                      return <div className="massage user2-chats">{_?.massage?.input}</div>
                    }
                  })
                }
              </div>
              {/*========================== BOTTOM - CHAT ====================> */}
              <div className="right-chat-bottom">
                <input className="input-chat" value={input} onChange={handleChange} type="text" placeholder="Type your massages..." name="massage" />
                <div className="send-btn" onClick={handleSend}>
                  <img src={Send} alt="" />
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Chat;