import "../styles/notifications.scss";
import { notificationLists, notificationRead } from "../APIs/notification.js";
import { useEffect, useState } from "react";
import THREEDOT from "../Assests/threeDots.svg"

const Notifications = ({ notification: { notiLists }, setNotification }) => {
    const [notificationIds, setNotificationIds] = useState('');
    // notification read =>
    const handleClick = (notificationId) => {
        setNotificationIds(notificationId)
    }
    // notification read and lists =>
    useEffect(() => {
        if (notificationIds) { notificationRead('chit-chat/user/notification/isRead', notificationIds); }
        notificationLists('chit-chat/user/notification/lists', localStorage.getItem('token'), setNotification);
    }, [notificationIds])
    return (
        <div className="notification-container">
            <div className="header">
                <h3> Notifications 🔔</h3>
                <img src={THREEDOT} alt="" width={40} />
            </div >
            <div className="notification-bottom">
                {
                    notiLists.map((notify, index) => {
                        let date = new Date(notify.timestamp)
                        let hours = date.getHours();
                        let minute = date.getMinutes();
                        return (
                            <div className="notification-lists" key={index} style={notify.isRead ? { background: "#f2f2f2" } : null} onClick={() => notify.isRead ? null : handleClick(notify._id)
                            }>
                                <div className="sender-profile-photo">
                                    <img src={notify?.userId?.profilePhoto} alt="not available" />
                                </div>
                                <div className="sender-name">
                                    <b>{notify?.userId.name} </b>{notify?.notifyMsg}
                                </div>
                                <div className="notification-time">
                                    <div className="icon">⌚</div>
                                    <time className="date-time">{hours > 12 ? `${hours % 12}:${minute} A.M` : `${hours}:${minute} P.M`}</time>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Notifications;