import { createContext, useState } from "react";

// user =>
export const UserContext = createContext({})
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(
        {
            oldRoomId: "",
            roomId: "",
            userName: "",
            isActive: "",
            userPhoto: "",
            participant: [],
            isOnline: '',
            lastSeen: '',
            timestamp: ""
        }
    )
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export const NotificationContext = createContext({})
export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState(
        {
            notiCount: 0,
            notiLists: [],
            notificationIds: ''
        }
    )
    return (
        <NotificationContext.Provider value={{ notification, setNotification }}>
            {children}
        </NotificationContext.Provider>
    )
}
