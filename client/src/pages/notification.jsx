import "../styles/notifications.scss";
import { useEffect, useState } from "react";
import THREEDOT from "../Assests/threeDots.svg"
import { notificationRead } from "../APIs/notification";

const Notifications = ({ notification: { notiLists }, setNotification }) => {

    // handle read notification =>
    const handleReadNotify = (ids) => {
        setNotification((prevState) => ({ ...prevState, notificationIds: ids }))
    }

    return (
        <div className="notification-container">
            <div className="header">
                <div style={{ fontWeight: "bold" }}> Notifications 🔔</div>
                <div className="notify-threedot">
                    <img src={THREEDOT} alt="" />
                </div>
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
            <div className="notification-paginations">
            </div>
        </div >
    )
}

export default Notifications;