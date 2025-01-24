import axios from "axios";

let CHAT_URL = "http://localhost:8080";

export const api = axios.create({
    baseURL: CHAT_URL,
    timeout: 5000,
});

api.interceptors.request.use(
    (config) => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getProfileUser = async (_id) => {
    let response = await api.post("/profile", { _id });
    return response.data;
};

export const registerUserLists = async () => {
    let userId = localStorage.getItem("token");
    let response = await api.get(`/register/${userId}`);
    return response.data;
};

export const userAuthorization = async (userData, route) => {
    let responseUser = await api.post(route, userData);
    return responseUser.data;
};
