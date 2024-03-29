import { useEffect, useState } from "react";
import "../styles/chat.scss";
import Emojis from "../Assests/emojis.svg";
import Send from "../Assests/send.svg";
import Attach from "../Assests/attachment.svg";
import Call from "../Assests/call.svg";
import Microphone from "../Assests/microphone.svg";
import ThreeDots from "../Assests/threeDots.svg";
import { EmojiList } from "./emoji";
import { Attachements } from "./attachments";
import { threeDashPopUp, chatUsers } from "../data/AllData.js";
import { fetchAllChats } from "../APIs/api";


const Chat = () => {
  const [chat, setChat] = useState([]);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentuser] = useState("")
  const [isEmojiShow, setEmojiShow] = useState(false);
  const [isAttachmentShow, setAttachmentShow] = useState(false);
  const [writeMassage, setWriteMassage] = useState(
    {
      userId: "",
      massage: ""
    }
  )
  const [sendMassage, setSendMassage] = useState([]);

  // Fetching Chats data =>
  useEffect(() => {
    fetchAllChats(setChat);
  }, []);



  // search =>  
  const inputSearch = (e) => {
    let { value } = e.target;
    setSearch(value)
  }

  // Three dash show/hide => 
  const handleThreeDash = () => {
    if (isEmojiShow)
      setEmojiShow(false)
    if (isAttachmentShow)
      setAttachmentShow(false)
    show ? setShow(false) : setShow(true)
  }

  // Emojis show/hide =>
  const handleEmojiShow = () => {
    setAttachmentShow(false)
    setShow(false)
    isEmojiShow ? setEmojiShow(false) : setEmojiShow(true)
  }


  // Attachements show/hide =>
  const handleAttachmen = () => {
    setEmojiShow(false)
    setShow(false)
    isAttachmentShow ? setAttachmentShow(false) : setAttachmentShow(true)
  }

  // Input massage  =>
  const handleChangeMassage = (e) => {
    let { value } = e.target;
    setWriteMassage({ ...writeMassage, massage: value });
  }

  // Send massage =>
  const handleSendMassage = () => {
    setSendMassage([...sendMassage, writeMassage])
    // DummyChats.push(
    //   {
    //     id: 3,
    //     sender: "Jitesh",
    //     message: writeMassage.massage,
    //     timestamp: new Date()
    //   }
    // )
    setWriteMassage({ massage: "" });
  }

  return (
    <div className="chat-container">

      <div className="left-chat-container">

        <h2 className="chit-chat">Chit-Chat</h2>
        <div className="input-search">
          <img src="" alt="" />
          <input type="text" placeholder="Search user for chat...." value={search} onChange={inputSearch} />
        </div>
        <div className="chat-lists">
          {
            chatUsers.map((_, i) => {
              if (_.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return (
                  <div className="users">
                    <div className="users-profile">
                    </div>
                    <div className="user-name" onClick={() => {
                      setCurrentuser(_)
                    }}>
                      <div className="name">
                        <b className="user" >{_}</b>
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

        <div className="right-chat-top">
          <div className="right-chat-left">
            <div className="users-profile"></div>
            <h2 className="user-name-mi">{currentUser}</h2>
          </div>
          <div className="right-top-right">
            <img src={Call} alt="" width={26} />
            <img src={ThreeDots} style={{ cursor: "pointer" }} onClick={handleThreeDash} alt="" width={26} />
          </div>
        </div>

        <div className="right-chat-mid">
          {
            chat.map(({ sender, message, timestamp }, i) => {
              let time = new Date(timestamp);
              if (sender === "Aman") {
                return (
                  <div className="user1-chats individual-chat" key={i}>
                    <div className="massage">{message}</div>
                    <div className="send-massage-time">
                      <span className="time">{time.getHours() % 12}:{time.getMinutes()}</span>
                      <span className="time-am-pm">{time.getHours() > 12 ? "pm" : "am"}</span>
                    </div>
                  </div>
                )
              } else {
                return (
                  <div className="user2-chats individual-chat">
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

          {/*<<<============ THREE-DASH  SHOW/HIDE =========> */}

          {
            show && (
              <div className="threedash-popup">
                {
                  threeDashPopUp.map((_, i) => {
                    return <div className="threeDash-buttons" key={i}>{_}</div>
                  })
                }
              </div>
            )
          }

          {/*<<<========== ATACHMENTS  SHOW/HIDE ==========> */}

          {
            isAttachmentShow && (
              <div className="attachements-container">
                <Attachements />
              </div>
            )
          }

          {/*<<<============= EMOJIS SHOW/HIDE ==========> */}

          {
            isEmojiShow && (
              <div className="emojis-container">
                <EmojiList setWriteMassage={setWriteMassage} />
              </div>
            )
          }

        </div>
        <div className="right-chat-bottom">
          <img src={Microphone} alt="" width={23} />
          <input type="text" placeholder="Type your massages..." value={writeMassage.massage} name="massage" className="input-chat" onChange={handleChangeMassage} />
          <img src={Emojis} alt="" width={20} onClick={handleEmojiShow} />
          <img src={Attach} alt="" width={20} onClick={handleAttachmen} />
          <div className="send-btn" onClick={handleSendMassage}>
            <img src={Send} alt="" />
          </div>
        </div>

      </div>
    </div>
  )
}

export default Chat;