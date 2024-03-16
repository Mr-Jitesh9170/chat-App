import { useState } from "react"
import "../styles/chat.scss"
import Emojis from "../Assests/emojis.svg"
import Send from "../Assests/send.svg"
import Attach from "../Assests/attachment.svg"
import Call from "../Assests/call.svg"
import Microphone from "../Assests/microphone.svg"
import ThreeDots from "../Assests/threeDots.svg"
import { EmojiList } from "./emoji"

const Chat = () => {
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const [currentUser, setCurrentuser] = useState("")
  // search =>
  const inputSearch = (e) => {
    let { value } = e.target;
    setSearch(value)
  }

  const handleThreeDash = () => {
    show ? setShow(false) : setShow(true)
  }

  return (
    <div className="chat-container"  >
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
            show && (
              <div className="threedash-popup">
                {
                  threeDashPopUp.map((_) => {
                    return <div className="threeDash-buttons">{_}</div>
                  })
                }
              </div>
            )
          }

          <EmojiList />
        </div>
        <div className="right-chat-bottom">
          <img src={Microphone} alt="" width={23} />

          <input type="text" placeholder="Type your massages..." className="input-chat" />
          <img src={Emojis} alt="" width={20} />
          <img src={Attach} alt="" width={20} />
          <div className="send-btn">
            <img src={Send} alt="" />
          </div>
        </div>
      </div>


    </div>
  )
}

export default Chat;

let threeDashPopUp = ["Search", "Share", "Starred massage", "Clear chats",]
let chatUsers = ["Aman Bhai", "Mohit Sir", "Sachin Thapa", "Pushparaj Sir", "Rahul Sir", "Anshul Sir", "Monu", "Saumya Mam", "Prerana Mam", "Anand", "Pragati"]