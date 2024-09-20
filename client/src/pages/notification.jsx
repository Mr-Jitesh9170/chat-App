import "../styles/notifications.scss";
import { useEffect, useState } from "react";
import THREEDOT from "../Assests/threeDots.svg"
import DELETEICONS from '../Assests/deleteIcons.svg'
import { deleteMessages } from "../APIs/notification";

const Notifications = ({ notification: { notiLists }, setNotification }) => {
    const [isDelete, setDelete] = useState(
        {
            isThreeDot: false,
            isSelect: false
        }
    );
    const [deleteIds, setDeleteIds] = useState([])

    // handle delete selected msg =>
    const handleDelSelMsg = () => {
        deleteMessages('chit-chat/user/notification/delete', { toUser: localStorage.getItem('token'), deleteIds })
        setDelete({ isThreeDot: false, isSelect: false })
        setDeleteIds([])
    }
    // handle check boxes =>
    const handleCheckBox = (e, notifyIds) => {
        if (e.target.checked) {
            setDeleteIds([...deleteIds, notifyIds])
        } else {
            setDeleteIds((prevState) => {
                let filteredData = prevState.filter((prev) => prev !== notifyIds)
                return filteredData
            })
        }
    }

    // handle cancel =>
    const handleCancel = () => {
        setDelete({ ...isDelete, isSelect: false })
        setDeleteIds([])
    }
    // handle read notification =>
    const handleReadNotify = (ids) => {
        setNotification((prevState) => ({ ...prevState, notificationIds: ids }))
    }
    // three dot click =>
    const handleThreeDot = () => {
        isDelete.isThreeDot ? setDelete({ ...isDelete, isThreeDot: false }) : setDelete({ ...isDelete, isThreeDot: true })
    }
    // delete notifications =>
    const handleDelete = () => {
        setDelete({ isThreeDot: false, isSelect: true })
    }
    return (
        <div className="notification-container">
            <div className="header">
                {isDelete.isSelect && <b className="cancle-btn" onClick={handleCancel}>Cancel</b>}
                <div style={{ fontWeight: "bold" }}> Notifications 🔔</div>
                {deleteIds.length == 0 ? (
                    <div className="notify-threedot" onClick={handleThreeDot}>
                        <img src={THREEDOT} alt="" />
                    </div>
                ) : (
                    <div className="notify-threedot" onClick={handleDelSelMsg}>
                        <img src={DELETEICONS} alt="" />
                    </div>
                )}
            </div >
            {
                isDelete.isThreeDot && ( 
                    <div className="delete-notifications" onClick={handleDelete}>
                        <span>Delete</span>
                        <div className="delete">
                            <img src={DELETEICONS} alt="" />
                        </div>
                    </div>
                )
            }
            <div className="notification-bottom" style={notiLists.length === 0 ? { display: "flex", justifyContent: "center", alignItems: "center" } : {}}>
                {
                    notiLists.length > 0 ? (
                        notiLists.map((notify, index) => {
                            let date = new Date(notify.timestamp)
                            let hours = date.getHours();
                            let minute = date.getMinutes();
                            return (
                                <div className="notification-lists" key={index} style={notify.isRead ? { background: "#f2f2f2" } : null} onClick={() => handleReadNotify(notify._id)}>
                                    {isDelete.isSelect && <input type="checkbox" className="checkbox" onClick={(e) => handleCheckBox(e, notify._id)} />}
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
                    ) : (
                        <div className="no-notifications">
                            <img src="https://cdni.iconscout.com/illustration/premium/thumb/no-notification-7359561-6024629.png?f=webp" alt="" />
                        </div>
                    )
                }
            </div>
            <div className="notification-paginations">
            </div>
        </div >
    )
}

export default Notifications;