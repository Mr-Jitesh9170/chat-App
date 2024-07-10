import axios from "axios"
let CHAT_URL = "http://localhost:8080";

// fetch chat massages =>
export const fetchCountUnreadMsg = async (routes, recieverId) => {
    try {
        let { data: { results } } = await axios.post(CHAT_URL + routes, { recieverId });
        return { unReadCount: results?.unReadMsgCount, lastMassage: results?.lastMassage?.massage, timeStamp: results?.lastMassage?.timestamp }
    } catch (error) {
        console.log(error, "<---- Error fetching massage count and unread!")
    }
}
 
// fetch chat massages =>
export const fetchMassages = async (setMassages, routes) => {
    try {
        let { data: { results } } = await axios.get(CHAT_URL + routes);
        setMassages([...results])
    } catch (error) {
        console.log(error, "<----  Error fetching massage!")
    }
}