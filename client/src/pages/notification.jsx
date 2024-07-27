import "../styles/notifications.scss";
import { useEffect, useState } from "react";
import THREEDOT from "../Assests/threeDots.svg"
import { notificationRead } from "../APIs/notification";

const Notifications = ({ notification: { notiLists } }) => {
    const [notificationIds, setNotificationsIds] = useState('');

    // handle read notification =>
    const handleReadNotify = (ids) => {
        setNotificationsIds(ids)
    }
    useEffect(() => {
        notificationRead('chit-chat/user/notification/isRead', notificationIds);
    }, [notificationIds, notification])
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
                            <div className="notification-lists" key={index} style={notify.isRead ? { background: "#f2f2f2" } : null} onClick={() => handleReadNotify(notify._id)}>
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