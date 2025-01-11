import GalleryIcon from "../Assests/gallery.svg"
import DocumentsIcon from "../Assests/document.svg"
import LocationIcon from "../Assests/location.svg"
import CameraIcon from "../Assests/camera.svg"
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";


// Dashboard Icons =>
import ChatIcon from "../Assests/chatIcons.svg";
import SettingIcon from "../Assests/settingIcons.svg";
import ProfileIcon from "../Assests/profileIcons.svg";
import NotificationIcon from "../Assests/notificationIcons.svg";
import LogoutIcon from "../Assests/logout.svg"


// Edit Profile => 
export const editProfile = [
    {
        name: "profilePhoto",
        accept: "image/*",
        type: "file",
    },
    {
        name: "name",
        placeHolder: "Name...",
        type: "text",
    },
    {
        name: "email",
        placeHolder: "Email...",
        type: "email",
    },
    {
        name: "number",
        placeHolder: "Number...",
        type: "number",
    },
    {
        name: "address",
        placeHolder: "Address...",
        type: "text",
    },
]

// Dashboard Icons =>
export const navLiks = [
    {
        icons: <IoMdLogOut size={40} color="#fff" />
    }
];
  