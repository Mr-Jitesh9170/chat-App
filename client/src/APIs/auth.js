import axios from "axios";
// import jwtDecode from "jwt-decode";

let CHAT_URL = "http://localhost:8080";

export const api = axios.create({
    baseURL: CHAT_URL,
    timeout: 5000,
});


// api.interceptors.request.use(
//     (config) => {
//         let token = localStorage.getItem("jwtToken");

//         if (token) {
//             alert("Session expired! Please log in again.");
//             localStorage.removeItem("accessToken");
//             localStorage.removeItem("refreshToken");
//             window.location.href = "/login";
//             return Promise.reject("Token expired");
//         }

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

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
