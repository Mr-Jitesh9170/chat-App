import { dateToString } from "../../utils/timeAgo";
import "./message.scss"

export const Message = ({ newMsg, user }) => {
    return (
        <div className={`${newMsg.senderId === localStorage.getItem('token') ? "me" : "you"}`} >
            <span>{newMsg.massage}</span>
            <span className="time">{dateToString(newMsg.timestamp)}</span>
            {newMsg.senderId === localStorage.getItem('token') && < b style={newMsg?.seen ? { color: "blue" } : { color: "black" }}>{newMsg?.seen ? '✓✓' : (user.isOnline ? '✓✓' : '✓')}</b>}
        </div >
    )
}