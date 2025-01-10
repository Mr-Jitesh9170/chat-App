import { createContext, useState } from "react";

// User context =>
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
 