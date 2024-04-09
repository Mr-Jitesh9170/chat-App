import axios from "axios"

let CHAT_URL = "http://localhost:8080/";

export const userProfileUpdate = async (userData, route) => {
    try {
        let responseUser = await axios.put(CHAT_URL + route, userData);
        return responseUser.data;
    } catch (error) {
        console.log(error, " <---- Error");
    }
}



// User Authorizations ( Register/Login ) =>
export const userAuthorization = async (userData, route) => {
    try {
        let responseUser = await axios.post(CHAT_URL + route, userData);
        return responseUser.data;
    } catch (error) {
        console.log(error, " <---- Error");
    }
}

// Registered users Lists =>
export const registerUserLists = async (setChatUsersLists) => {
    try {
        let response = await axios.get(CHAT_URL + "register");
        setChatUsersLists(response.data.results);
    } catch (error) {
        console.log(error, " <---- Error");
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