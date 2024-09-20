import { useEffect, useRef, useState } from "react";
import "../styles/chat.scss";
import Send from "../Assests/send.svg";
import io from "socket.io-client";
import { fetchMassages } from "../APIs/chatApi";
import { getTime } from "../utils/date";
import { useNavigate } from "react-router-dom";
 
export const socket = io("http://localhost:8080");

const Chat = ({ user }) => {
  const profile = useNavigate();
  const [input, setInput] = useState(""); 
  const [massage, setMassage] = useState([]);
  const [room, setRoom] = useState(
    {
      roomId: "",
      roomChatId: ""
    }
  );
  const [isTyping, setTyping] = useState({ typing: false, _id: '' });

  useEffect(() => {
    if (!user.roomId) {
      return
    }
    // fetch massages =>
    fetchMassages(setMassage, `/user/massage/${user.roomId}`);
    // emit roomId =>
    socket.emit("roomJoin", {
      user: localStorage.getItem('token'),
      roomId: user?.roomId,
      participant: user?.participant,
      timestamp: user?.timestamp,
    });
    // old room leave => 
    if (user.oldRoomId) {
      socket.emit('roomLeave', user.oldRoomId);
    }
  }, [user]);

  useEffect(() => {
    // room joining =>
    socket.on('roomJoin', (roomNumber) => {
      setRoom({ roomId: roomNumber.roomId, roomChatId: roomNumber.roomChatId });
    })
    // new message =>
    socket.on("chat", (newMessage) => {
      setMassage((prevMessages) => [...prevMessages, newMessage]);
    });

    // typing =>
    socket.on('typing', ({ isTyping, _id }) => {
      setTyping({ typing: isTyping, _id })
    })
    return () => {
      socket.emit('roomLeave', user.roomId)
      socket.off();
    }
  }, []);

  // input massage =>
  const handleInput = (e) => {
    setInput(e.target.value);
    socket.emit('typing', { isTyping: true, roomId: room.roomId, _id: socket.id })
  };

  // send massage =>
  const handleSend = () => {
    if (!input.trim()) return;
    let createMassage = {
      roomChatId: room.roomChatId,
      massage: input.trim(),
      timestamp: new Date(),
      seen: false,
      senderId: localStorage.getItem("token"),
    }
    socket.emit("chat", user?.roomId, createMassage);
    setInput("");
    socket.emit('typing', { isTyping: false, roomId: room.roomId, _id: socket.id })
  };

  // scroll top to bottom =>
  const scrollRef = useRef(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [massage]);

  return (
    <>
      {user.userName !== '' ? (
        <div className="chat-container">
          <div className="chat-top">
            <div className="chat-profile">
              <img src={user?.userPhoto} alt="" />
            </div>
            <div className="chat-head">
              <h4>{user?.userName}</h4>
              <p className="active">
                {(isTyping.typing && isTyping._id !== socket.id) ? 'Typing...' : (user.isOnline ? 'online' : `Last Seen - ${getTime(user.lastSeen)}`)}
              </p>
            </div>
          </div>
          <div className="chat-mid" ref={scrollRef}>
            {
              massage.map((newMsg, index) => {
                if (newMsg.senderId === localStorage.getItem('token')) {
                  return (
                    <div className="me" key={index}>
                      <span>{newMsg.massage}</span>
                      <span className="time">{getTime(newMsg.timestamp)}</span>
                      <b style={newMsg?.seen ? { color: "blue" } : { color: "black" }}>{newMsg?.seen ? '✓✓' : (user.isOnline ? '✓✓' : '✓')}</b>
                    </div>
                  );
                } else {
                  return (
                    <div className="you" key={index}>
                      <span>{newMsg.massage}</span>
                      <span className="time">
                        {getTime(newMsg.timestamp)}
                      </span>
                    </div>
                  );
                }
              })
            }
          </div>
          <div className="chat-bottom">
            <input type="text" value={input} placeholder={`Say hello to ${user.userName.toLowerCase()}!`} onChange={handleInput} />
            <button className="send-button" onClick={handleSend}>
              <img src={Send} alt="" />
            </button>
          </div>
        </div>
      ) : profile('/chit-chat/dashboard/profile')}
    </>
  );
};
export default Chat;