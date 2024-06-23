import { useEffect, useState } from "react"
import "../styles/chat.scss"
import Send from "../Assests/send.svg"
import io from "socket.io-client"

const socket = io("http://localhost:8080");

const Chat = ({ user }) => {
  const [input, setInput] = useState("")
  const [massage, setMassage] = useState([])
  const [typing, setTyping] = useState(false);
  useEffect(() => {
    socket.on("typing...", (value) => {
      setTyping(value)
    })
    //  new massage =>
    socket.on("chat", (newMassages) => {
      setMassage([...massage, newMassages])
    })
    // room setup =>
    if (user.room !== "" || user.room !== null) {
      socket.emit("roomJoin", user.room);
    }
  })

  // input massage =>
  const handleInput = (e) => {
    setInput(e.target.value)
    socket.emit("typing...", true)
  }
  // send massage =>
  const handleSend = () => {
    if (!input.trim())
      return
    socket.emit("chat", user.room, input.trim())
    setInput("")
  }
  console.log(typing, "<--- another user is typing!")
  return (
    <>
      {
        user.userName && (
          <div className="chat-container">
            <div className="chat-top">
              <div className="chat-profile">
                <img src={user?.userPhoto} alt="" />
              </div>
              <div className="chat-head">
                <h4>{user?.userName}</h4>
                <p className="active">{user?.isActive ? "Online" : "Offline"}</p>
              </div>
            </div>
            <div className="chat-mid">
              {
                massage.map((newMsg, index) => {
                  let date = new Date(newMsg.date);
                  let hours = date.getHours(), minutes = date.getMinutes();
                  if (newMsg.id === socket.id) {
                    return <div className="me" key={index}>{newMsg.massage} <span>{hours > 12 ? `${hours % 12}:${minutes}PM` : `${hours}:${minutes}AM`}</span> </div>
                  }
                  else {
                    return <div className="you">{newMsg.massage} <span>{hours > 12 ? `${hours % 12}:${minutes}PM` : `${hours}:${minutes}AM`}</span></div>
                  }
                })
              }
            </div>
            <div className="chat-bottom">
              <input type="text" value={input} onChange={handleInput} />
              <button className="send-button" onClick={handleSend}>
                <img src={Send} alt="" />
              </button>
            </div>
          </div>
        )
      }
    </>
  )
}
export default Chat;