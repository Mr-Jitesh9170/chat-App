import "../styles/chat.scss"
const Chat = () => {
  return (
    <div className="chat-container">
      <div className="left-chat-container">
        <h2 className="chit-chat">Chit-Chat</h2>
        <div className="input-search">
          <img src="" alt="" />
          <input type="text" placeholder="Search user or chat ...." />
        </div>
        <div className="chat-lists">
          {
            chatUsers.map((_) => {
              return (
                <div className="users">
                  <div className="users-profile">
                  </div>
                  <div className="user-name">
                    <div className="name">
                      <b className="user">Jitesh</b>
                      <span className="chat-time">9m</span>
                    </div>
                    <div className="last-chat">ok thanks</div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>

      <div className="right-chat-contain">

      </div>
    </div>
  )
}

export default Chat;


let chatUsers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9,]