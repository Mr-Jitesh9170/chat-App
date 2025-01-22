import axios from "axios"

let CHAT_URL = "http://localhost:8080/";

export const api = axios.create({
    baseURL: CHAT_URL,
    headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` }
});

export const getProfileUser = async (setUserProfile, _id) => {
    try {
        let { data: { results } } = await api.post("profile", { _id });
        return setUserProfile(results);
    } catch (error) {
        console.log(error, " <---- User profile data not retrieved");
    }
}

export const registerUserLists = async () => {
    let userId = localStorage.getItem("token")
    let response = await api.get(`register/${userId}`);
    return response.data
}
export const userAuthorization = async (userData, route) => {
    let responseUser = await api.post(route, userData);
    return responseUser.data;
}