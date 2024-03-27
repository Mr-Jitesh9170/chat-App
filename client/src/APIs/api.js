import axios from "axios"


// Users Chats => 
export const fetchAllChats = async (setChat) => {
    try {
        let { data } = await axios.get("http://localhost:8080/chat")
        setChat(data.results);
    } catch (error) {
        console.log(error, "<---- chat did not fetch.")
    }
}