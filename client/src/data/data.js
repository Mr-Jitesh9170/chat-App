 
import { CgProfile } from "react-icons/cg";
import { IoMdLogOut } from "react-icons/io";

 

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
  