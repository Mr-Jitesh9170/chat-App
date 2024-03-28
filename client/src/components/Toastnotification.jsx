export const ToastNotifications = ({ toastMassages }) => {


    // toast notifications styles =>
    const toastStyles = {
        backgroundColor: "#00203FFF",
        color: "#ADEFD1FF",
        fontWeight: "600",
        padding: "7px 14px",
        fontSize: "18px"
    }
    return (
        <div className="toast-massage-container" style={toastStyles}>{toastMassages}</div>
    )
}