import "../styles/notifications.scss"
import { dummyNotifications } from "../data/AllData";
const Notifications = () => {
    return (
        <div className="notification-container">
            {
                dummyNotifications.map((_) => {
                    let date = new Date(_.timestamp)
                    let hours = date.getHours();
                    let minute = date.getMinutes();
                    return (
                        <div className="notification-lists">
                            <div className="sender-profile-photo">
                                <img src={_?.profile_photo} alt="not available" />
                            </div>
                            <div className="sender-name">
                                <b>{_?.sender} </b>{_?.title}
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
    )
}

export default Notifications;