import { useEffect, useState } from "react"
import "../styles/notification.scss"
import NotificationsIcon from "../Assests/notificationIcons.svg";
import { dummyNotifications } from "../data/AllData";
import DeleteIcons from "../Assests/deleteIcons.svg"
import { Header } from "./header";

const Notifications = () => {
    const [isNotifications, setNotifications] = useState(false)
    const [isDelete, setDelete] = useState([...dummyNotifications])

    // Delete Notifications =>
    const handleNotificationDelete = (index) => {
        let deleteNotificatonData = isDelete.filter((_, i) => {
            return i != index
        })
        setDelete([...deleteNotificatonData]);
    }

    return (
        <>
            <Header heading={"Notification"} />
            {
                isNotifications ?
                    (
                        <div className="null-notification-container">
                            <div className="notification-image">
                                <img src={NotificationsIcon} alt="" width={150} />
                            </div>
                            <b>Notifications here !!!</b>
                            <p>You don't have any notifications yet</p>
                        </div>
                    )
                    :
                    (
                        <div className="notification-container">
                            {
                                isDelete.map((_, index) => {
                                    let date = new Date(_.timestamp)
                                    return (
                                        <div className="notification-data" key={index}>
                                            <div className="notification-part-1">
                                                <div className="notification-left">
                                                    <img src={_.profile_photo} alt="" />
                                                </div>
                                                <div className="notification-mid">
                                                    <b className="sender">{_.sender}</b>
                                                    <div className="notification-data">{_.body}</div>
                                                </div>
                                            </div>

                                            <div className="notification-right">
                                                <div className="notification-time">{date.getHours() > 12 ? date.getHours() % 12 : date.getHours()}:{date.getMinutes()} {date.getHours() > 12 ? "pm" : "am"}</div>
                                                <img src={DeleteIcons} alt="delete-btn" width={23} onClick={() => handleNotificationDelete(index)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    )
            }
        </>
    )
}


export default Notifications;