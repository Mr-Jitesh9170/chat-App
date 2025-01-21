import { api } from "./auth"
 
// fetch chat massages =>
export const fetchMassages = async (roomData) => {
    let results = await api.post("user/massage", roomData);
    return results.data;
}
