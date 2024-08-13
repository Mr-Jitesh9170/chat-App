import LOADER from "../Assests/loader.gif"

export const Loader = () => {
    return (
        <div className="loader-container" style={{ width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="loading-img" style={{ width: "30px", height: "30px" }}>
                <img src={LOADER} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
        </div>
    )
}