import axios from "axios"

let CHAT_URL = "http://localhost:8080/";


// delete notifications =>
export const deleteMessages = async (routes, deleteMsg) => {
    try {
        await axios.post(CHAT_URL + routes, deleteMsg);
        console.log('message deleted successfully!')
    } catch (error) {
        console.log(error, "<----  Error deletion massage!")
    }
}

// notification lists and counts =>
export const notificationLists = async (routes, userId, setNotification) => {
    try {
        let { data: { notifiCounts, notiLists } } = await axios.post(CHAT_URL + routes, { userId });
        setNotification({ notiCount: notifiCounts, notiLists: [...notiLists] })
    } catch (error) {
        console.log(error, " <---- Notifications retrieve failed!");
    }
}

// notification read =>
export const notificationRead = async (routes, notificationIds) => {
    try {
        await axios.post(CHAT_URL + routes, { notificationIds });
    } catch (error) {
        console.log(error, " <---- Notifications retrieve failed!");
    }
}

// notification create =>
export const sendNotifications = async (routes, notification) => {
    try {
        await axios.post(CHAT_URL + routes, notification);
    } catch (error) {
        console.log(error, " <---- Notifications sending failed!");
    }
}