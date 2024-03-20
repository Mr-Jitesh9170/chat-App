import { Styles1 } from "./emoji"
import { AttachementsData } from "../data/AllData"

export const Attachements = () => {
    return (
        <div className="attachemnts-container" style={Styles1}>
            {
                AttachementsData.map(({ img, name }) => {
                    return (
                        <div className="attachements" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
                            <img src={img} alt="" width={28} />
                            <div className="attachments-name" style={{ fontSize: "13px" }}>{name}</div>
                        </div>
                    )
                })
            }
        </div>
    )
}
