import { useEffect, useRef, useState } from "react";
import "../styles/chat.scss";
import io from "socket.io-client";
import { OneToOneConvertationLists } from "../apis/chatApi";
import { dateToString } from "./../utils/timeAgo";
import useLoader from "../hooks/loader";
import { VscSend } from "react-icons/vsc";
import { Message } from "../components/message/message";
import { Link, useParams } from "react-router-dom";
import { useInputChange } from "../hooks/inputChange";
import { IoCallOutline } from "react-icons/io5";

export const socket = io("http://localhost:8080");

const Chat = () => {
  const { userId } = useParams()
  let logginUser = localStorage.getItem("token");
  let userRoomId = [logginUser, userId].sort().join("");
  const { input, setInput } = useInputChange("")
  const [userDetails, setUserDetails] = useState({});
  const [massage, setMassage] = useState([]);
  const [room, setRoom] = useState(
    {
      roomId: "",
      roomChatId: ""
    }
  );

  const [isTyping, setTyping] = useState({ typing: false, _id: '' });
  const { loading, setLoading, Loader } = useLoader();

  const handleInput = (e) => {
    setInput(e.target.value);
    socket.emit('typing', { isTyping: true, roomId: userRoomId, _id: socket.id })
  };

  const handleSend = () => {
    let inputMessage = input.trim();
    if (!inputMessage) return;
    let createMassage = {
      roomChatId: room.roomChatId,
      massage: inputMessage,
      timestamp: new Date(),
      seen: false,
      senderId: logginUser,
    }
    socket.emit("chat", userRoomId, createMassage);
    setInput("");
  };

  const retriveOneToOneMsg = async () => {
    try {
      let results = await OneToOneConvertationLists({ userId, roomId: userRoomId })
      setUserDetails(results?.userDetails);
      setMassage(results?.converstationLists);
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    retriveOneToOneMsg();
    socket.emit("roomJoin", {
      user: logginUser,
      roomId: userRoomId,
      participant: [logginUser, userId],
      timestamp: new Date(),
    });
    setRoom((prev) => {
      if (prev.roomId) {
        socket.emit('roomLeave', prev.roomId);
      }
    })
  }, [userRoomId]);


  useEffect(() => {
    socket.on('roomJoin', (roomNumber) => {
      setRoom({ roomId: roomNumber.roomId, roomChatId: roomNumber.roomChatId });
    })
    socket.on("chat", (newMessage) => {
      setMassage((prevMessages) => [...prevMessages, newMessage]);
    });
    socket.on('typing', ({ isTyping, _id }) => {
      setTyping({ typing: isTyping, _id })
    })
    return () => {
      socket.emit('roomLeave', room.roomId)
      socket.off();
    }
  }, []);


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
          <div className="leftChatTop">
            <div className="chat-profile">
              <img src={userDetails?.profilePhoto} alt="" />
            </div>
            <div className="chat-head">
              <h4>{userDetails?.name}</h4>
              <p className="active">
                {(isTyping.typing && isTyping._id !== socket.id) ? 'Typing...' : (userDetails.isOnline ? 'online' : `Last Seen • ${dateToString(userDetails.lastSeen)}`)}
              </p>
            </div>
          </div>
          <Link to={`/call/${12122}`} className="callBtn">
            <IoCallOutline color="#37306B" size={30} />
          </Link>
        </div>
        <div className="chat-mid" ref={scrollRef}>
          {
            loading ?
              (
                <Loader size={25} />
              ) :
              (
                massage?.map((newMsg, index) => {
                  return <Message key={index} newMsg={newMsg} user={userDetails} />
                })
              )
          }
        </div>
        <div className="chat-bottom">
          <input type="text" value={input} placeholder={`Say hello to...`} onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend()
            }
          }} onChange={handleInput} />
          <button className="send-button" onClick={handleSend} >
            <VscSend color="#fff" size={30} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;