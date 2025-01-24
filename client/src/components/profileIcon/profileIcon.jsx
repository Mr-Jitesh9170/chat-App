import "./profileIcon.scss"

export const ProfileIcon = ({ img, width, height }) => {
    return (
        <div className="profileIconContainer" style={{ width: width ?? "40px", height: height ?? "40px" }}>
            <img src={img ?? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9LJ-AHFG7OTn0OFl7v2m8elkhlz2iIodFuXpBTVROwQ&s"} alt="loading" />
        </div>
    )
}
 