import { api } from "./auth"

export const OneToOneConvertationLists = async (roomData) => {
    let results = await api.post("/user/1to1/convertations", roomData);
    return results.data;
}
