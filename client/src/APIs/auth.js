import axios from "axios"

let CHAT_URL = "http://localhost:8080/";

export const api = axios.create({
    baseURL: CHAT_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
});


// Get , User Profile Data =>
export const getProfileUser = async (setUserProfile, _id) => {
    try {
        let { data: { results } } = await api.post("profile", { _id });
        return setUserProfile(results);
    } catch (error) {
        console.log(error, " <---- User profile data not retrieved"); 
    }
}

// Update user profile =>
export const userProfileUpdate = async (userData, route) => {
    try {
        let responseUser = await api.put(route, userData);
        return responseUser.data;
    } catch (error) {
        console.log(error, " <---- User profile not updated");
    }
}

// Registered Users Lists =>
export const registerUserLists = async () => {
    let userId = localStorage.getItem("token")
    let response = await api.get(`register/${userId}`);
    return response.data
}

// User Authorizations ->
export const userAuthorization = async (userData, route) => {
    let responseUser = await api.post(route, userData);
    return responseUser.data;
}