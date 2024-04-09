import { useState } from "react"
import "../styles/profile.scss"
import { userProfileUpdate } from "../APIs/api";


const Profile = () => {
    const [profile, setProfile] = useState(false);
    const [input, setInput] = useState(
        {
            _id: "66153be913a5d1cef78879cb",
            profilePhoto: "",
            name: "",
            email: "",
            number: "",
            address: ""
        }
    );

    // Edit profile data=>
    const editProfile = [
        {
            name: "profilePhoto",
            accept: "image/*",
            type: "file",
            value: input.profilePhoto
        },
        {
            name: "name",
            placeHolder: "Name...",
            type: "text",
            value: input.name
        },
        {
            name: "email",
            placeHolder: "Email...",
            type: "email",
            value: input.email
        },
        {
            name: "number",
            placeHolder: "Number...",
            type: "number",
            value: input.number

        },
        {
            name: "address",
            placeHolder: "Address...",
            type: "text",
            value: input.address
        },
    ]

    // handle changes=>
    const handleChange = (e) => {
        let { value, name, files } = e.target;
        setInput({ ...input, [name]: name === "profilePhoto" ? `${URL.createObjectURL(files[0])}` : value })
    }

    // updating profiles=>
    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        console.log(await userProfileUpdate(input, "profile"))
    }

    return (
        <div className="profile-container">
            {
                profile ?
                    (
                        <div className="view-profile-container">
                            <div className="view-profile-photo">

                            </div>
                        </div>
                    )
                    :
                    (
                        <div className="edit-profiles-container">
                            <h2>Profile!</h2>
                            <div className="preview-profiles-container">
                                <img className="profile-photo" src={input.profilePhoto ? input.profilePhoto : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile-photo" />
                            </div>
                            {
                                editProfile.map(({ name, accept, value, placeHolder, type }, key) => {
                                    return (
                                        (key === 0) ?
                                            (
                                                <label htmlFor="fileupload">
                                                    Updload
                                                    <input id="fileupload" type={type} className="files-input" onChange={handleChange} name={name} accept={accept} placeholder={placeHolder} key={key} />
                                                </label>
                                            )
                                            :
                                            (
                                                <input onChange={handleChange} type={type} value={value} name={name} placeholder={placeHolder} key={key} />
                                            )
                                    )
                                })
                            }
                            <button className="save-changes" onClick={handleUpdateProfile}>Update profile</button>
                        </div>
                    )
            }
        </div>
    )
}

export default Profile;