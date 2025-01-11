import { useContext, useEffect, useRef, useState } from "react";
import "../styles/chat.scss";
import io from "socket.io-client";
import { fetchMassages } from "../apis/chatApi";
import { getTime } from "../utils/date";
import { UserContext } from "../context/userContext";
import useLoader from "../hooks/loader";
import { VscSend } from "react-icons/vsc";
import { Message } from "../components/message/message";


export const socket = io("http://localhost:8080");

const Chat = () => {
  const { user } = useContext(UserContext)
  const [input, setInput] = useState("");
  const [massage, setMassage] = useState([]);
  const [room, setRoom] = useState(
    {
      roomId: "",
      roomChatId: ""
    }
  );
  const [isTyping, setTyping] = useState({ typing: false, _id: '' });
  const { loading, setLoading, Loader } = useLoader();



  useEffect(() => {
    if (!user.roomId) {
      return
    }
    // fetch massages =>
    fetchMassages(setMassage, `/user/massage/${user.roomId}`).finally(() => {
      setLoading(false)
    });
    
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
            loading ?
              (
                <Loader size={25} />
              ) :
              (
                massage.map((newMsg, index) => {
                  return <Message key={index} newMsg={newMsg} user={user} />
                })
              )
          }
        </div>
        <div className="chat-bottom">
          <input type="text" value={input} placeholder={`Say hello to ${user.userName}...`} onChange={handleInput} />
          <button className="send-button" onClick={handleSend}>
            <VscSend color="#fff" size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;