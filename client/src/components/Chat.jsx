import { useState } from "react"
import "../styles/chat.scss"
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
          <input type="text" placeholder="Search user or chat ...." value={search} onChange={inputSearch} />
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

      </div>
    </div>
  )
}

export default Chat;


let chatUsers = ["Jitesh", "Aman", "Mohit Sir", "Sachin Thapa", "Pushparaj", "Rahul", "Anshul", "Monu", "Saumya", "Prerana", "Anand", "Pragati"]