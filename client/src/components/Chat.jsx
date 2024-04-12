import { useEffect, useRef, useState } from "react";
import "../styles/chat.scss";
import Send from "../Assests/send.svg";
import { fetchAllChats, registerUserLists } from "../APIs/api";


const Chat = () => {
  // Searching Users =>
  const [search, setSearch] = useState("");
  // ChatUser Lists=>
  const [chatUserList, setChatUsersLists] = useState([]);
  // Particuler Chat person =>
  const [chat, setChat] = useState([]);

  const [currentUser, setCurrentuser] = useState("");

  const [writeMassage, setWriteMassage] = useState("");
  const [saveMassage, setSaveMassage] = useState([]);

  //INPUT MASSAGES =>
  const handleChangeMassage = (e) => {
    let { value } = e.target;
    setWriteMassage(value);
  }

  //SEND MASSAGES =>
  const handleSendMassage = () => {
    setSaveMassage(
      [
        ...saveMassage,
        {
          massage: writeMassage,
          massageTo: "",
          massageBy: localStorage.getItem("token"),
          timestamp: new Date()
        }
      ]
    )
    setWriteMassage("");
  }

  // APIs CALL =>
  useEffect(() => {
    // Fetching Chats data =>
    fetchAllChats(setChat);

    // Registered User Lists =>
    registerUserLists(setChatUsersLists);
  }, []);

  // SEARCH CHAT USER =>
  const inputSearch = (e) => {
    let { value } = e.target;
    setSearch(value)
  }

  // SCROLL TOP TO BOTTOM  =>
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatRef]);

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
              chatUserList.map((_, index) => {
                if (_.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                  return (
                    <div className="users" key={index}>
                      <div className="users-profile">
                        <img src={_.profilePhoto} alt="" />
                      </div>
                      <div className="user-name" onClick={() => {
                        setCurrentuser(_.name)
                      }}>
                        <div className="name">
                          <b className="user" >{_.name}</b>
                          <span className="chat-time">9m</span>
                        </div>
                        <div className="last-chat">ok thanks</div>
                      </div>
                    </div>
                  )
                }
              }
              )
            }
          </div>
        </div>

        <div className="right-chat-contain">

          {/* ===================== TOP - CHAT ===================================> */}

          <div className="right-chat-top">
            <div className="right-chat-left">
              <div className="users-profile"></div>
              <h2 className="user-name-mi">{currentUser}</h2>
            </div>
          </div>

          {/* ===================== MIDDLE - CHAT ===================================> */}

          <div className="right-chat-mid" ref={chatRef}>
            {
              chat.map(({ sender, message, timestamp }, index) => {
                let time = new Date(timestamp);
                if (sender === "Aman") {
                  return (
                    <div className="user1-chats individual-chat" key={index}>
                      <div className="massage">{message}</div>
                      <div className="send-massage-time">
                        <span className="time">{time.getHours() % 12}:{time.getMinutes()}</span>
                        <span className="time-am-pm">{time.getHours() > 12 ? "pm" : "am"}</span>
                      </div>
                    </div>
                  )
                } else {
                  return (
                    <div className="user2-chats individual-chat" key={index}>
                      <div className="massage">{message}</div>
                      <div className="send-massage-time">
                        <div className="time">{time.getHours() % 12}:{time.getMinutes()}</div>
                        <div className="time-am-pm">{time.getHours() > 12 ? "pm" : "am"}</div>
                      </div>
                    </div>
                  )
                }
              })
            }
          </div>

          {/*========================== BOTTOM - CHAT ====================> */}

          <div className="right-chat-bottom">
            <input className="input-chat" value={writeMassage} onChange={handleChangeMassage} type="text" placeholder="Type your massages..." name="massage" />
            <div className="send-btn" onClick={handleSendMassage}>
              <img src={Send} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Chat;