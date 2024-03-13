import { useState } from "react"
import "../styles/chat.scss"
import Emojis from "../Assests/emojis.svg"
import Send from "../Assests/send.svg"
import Attach from "../Assests/attachment.svg"


const Chat = () => {
  const [search, setSearch] = useState("");


  // search =>
  const inputSearch = (e) => {
    let { value } = e.target;
    setSearch(value)
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
            chatUsers.map((_) => {
              if (_.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
                return (
                  <div className="users">
                    <div className="users-profile">
                    </div>
                    <div className="user-name">
                      <div className="name">
                        <b className="user">{_}</b>
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

        </div>
        <div className="right-chat-mid"></div>
        <div className="right-chat-bottom">
          <div className="users-profile"></div>
          <input type="text" className="input-chat" />
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


let chatUsers = [ "Aman Bhai", "Mohit Sir", "Sachin Thapa", "Pushparaj Sir", "Rahul Sir", "Anshul Sir", "Monu", "Saumya Mam", "Prerana Mam", "Anand", "Pragati"]