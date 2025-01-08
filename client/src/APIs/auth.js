import axios from "axios"

let CHAT_URL = "http://localhost:8080/";

export const api = axios.create({
    baseURL: CHAT_URL,
    // withCredentials: true,    // Allow cookies to be sent
});

// Get , User Profile Data =>
export const getProfileUser = async (setUserProfile, _id) => {
    try {
        let { data: { results } } = await api.post(CHAT_URL + "profile", { _id });
        return setUserProfile(results);
    } catch (error) {
        console.log(error, " <---- User profile data not retrieved");
    }
}

// Update user profile =>
export const userProfileUpdate = async (userData, route) => {
    try {
        let responseUser = await api.put(CHAT_URL + route, userData);
        return responseUser.data;
    } catch (error) {
        console.log(error, " <---- User profile not updated");
    }
}


// Registered Users Lists =>
export const registerUserLists = async () => {
    let response = await api.get(CHAT_URL + "register");
    console.log(response)
    return response.data
}

// User Authorizations ( Register/Login ) =>
export const userAuthorization = async (userData, route) => {
    try {
        let responseUser = await api.post(CHAT_URL + route, userData);
        return responseUser?.data;
    } catch (error) {
        console.log(error, " <---- User not authorised");
    }
}
