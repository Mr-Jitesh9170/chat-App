import axios from "axios"

let CHAT_URL = "http://localhost:8080/";


// Get , User Profile Data =>
export const getProfileUser = async (setUserProfile, _id) => {
    try {
        let responseUser = await axios.post(CHAT_URL + "profile", { _id });
        return setUserProfile(responseUser.data.results);
    } catch (error) {
        console.log(error, " <---- User profile data not retrieved");
    }
}

// Update user profile =>
export const userProfileUpdate = async (userData, route) => {
    try {
        let responseUser = await axios.put(CHAT_URL + route, userData);
        return responseUser.data;
    } catch (error) {
        console.log(error, " <---- User profile not updated");
    }
}

// User Authorizations ( Register/Login ) =>
export const userAuthorization = async (userData, route) => {
    try {
        let responseUser = await axios.post(CHAT_URL + route, userData);
        return responseUser.data;
    } catch (error) {
        console.log(error, " <---- User not authorised");
    }
}

// Registered Users Lists =>
export const registerUserLists = async (setChatUsersLists) => {
    try {
        let response = await axios.get(CHAT_URL + "register");
        setChatUsersLists(response.data.results);
    } catch (error) {
        console.log(error, " <---- Registered user lists");
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