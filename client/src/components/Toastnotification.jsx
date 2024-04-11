import { useState } from "react";

export const ToastNotifications = ({ toastMassages }) => {
    const [showToast, setshowToast] = useState(true);
    setTimeout(() => {
        setshowToast(false)
    }, 2000);
    // toast notifications styles =>
    const toastStyles = {
        backgroundColor: "#ADEFD1FF",
        color: "#00203FFF",
        fontWeight: "600",
        padding: "7px 14px",
        fontSize: "18px",
        borderRadius: "6px",
        borderBottom: "solid black",
        transition: "all 0.7s"
    };
    return (
        <div className="toast-massage-container" style={showToast ? toastStyles : { display: "none" }}>{toastMassages}</div>
    )
}
