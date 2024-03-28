import axios from "axios"

let CHAT_URL = "http://localhost:8080/";

// User Authorizations =>
export const userAuthorization = async (userData, route) => {
    try {
        let response = await axios.post(CHAT_URL + route, userData);
        console.log(response, "<---- server response")
    } catch (error) {
        console.log(error, " <---- Error")
    }
}

// Users Chats => 
export const fetchAllChats = async (setChat) => {
    try {
        let { data } = await axios.get(`${CHAT_URL}chat`);
        setChat(data.results);
    } catch (error) {
        console.log(error, "  <---- chat did not fetch")
    }
}