import { useState } from "react"
import "../styles/chat.scss"
import Send from "../Assests/send.svg"
const Chat = () => {
  const [input, setInput] = useState("")
  const handleSend = () => {

  }

  // input massage =>
  const handleInput = (e) => {
    setInput(e.target.value)
  }
  return (
    <div className="chat-container">
      <div className="chat-top">
        <div className="chat-profile">
          <img src="" alt="" />
        </div>
        <div className="chat-head">
          <h4>User Name</h4>
          <div className="active">Active</div>
        </div>
      </div>
      <div className="chat-mid">Chal bhosadike!!</div>
      <div className="chat-bottom">
        <input type="text" />
        <button className="send-button">
          <img src={Send} alt="" />
        </button>
      </div>
    </div>
  )
}
export default Chat;


