import { api } from "./auth"
// fetch chat massages =>
export const fetchCountUnreadMsg = async (routes, recieverId) => {
    try {
        let { data: { results } } = await api.post(routes, { recieverId });
        return { unReadCount: results?.unReadMsgCount, lastMassage: results?.lastMassage?.massage, timeStamp: results?.lastMassage?.timestamp }
    } catch (error) {
        console.log(error, "<---- Error fetching massage count and unread!")
    }
}

// fetch chat massages =>
export const fetchMassages = async (setMassages, routes) => {
    try {
        let { data: { results } } = await api.get(routes);
        setMassages([...results])
    } catch (error) {
        console.log(error, "<----  Error fetching massage!")
    }
}

