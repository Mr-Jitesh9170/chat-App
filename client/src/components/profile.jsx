import { useEffect, useState } from "react"
import "../styles/profile.scss"
import { userProfileUpdate } from "../APIs/api";
import { getProfileUser } from "../APIs/api";

const Profile = () => {
    // user data =>
    const [userProfile, setUserProfile] = useState();
    const [profile, setProfile] = useState(true);
    const [input, setInput] = useState(
        {
            _id: localStorage.getItem("token"),
            profilePhoto: "",
            name: "",
            email: "",
            number: "",
            address: ""
        }
    );

    // User Profile data =>
    useEffect(() => {
        getProfileUser(setUserProfile, input._id)
    }, [])

    console.log(userProfile, "<---- user data is here")

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
        await userProfileUpdate(input, "profile");
        setProfile(true);
    }

    // updating edit profiles=>
    const handleEditProfile = () => {
        setProfile(false);
    }

    return (
        <>
            {
                profile ?
                    (
                        <div className="view-profile-container">
                            <h2>Profile!</h2>
                            <div className="view-profile-photo">
                                <img src={userProfile?.profilePhoto ? userProfile?.profilePhoto : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="" />
                            </div>
                            <div className="view-profile-user-details">
                                <div className="user-name">
                                    <b className="name">Name :</b>
                                    <b className="name">Email :</b>
                                    <b className="name">Number :</b>
                                    <b className="name">Address :</b>
                                </div>
                                <div className="user-name-details">
                                    <p>{userProfile.name}</p>
                                    <p>{userProfile.email}</p>
                                    <p>{userProfile.number}</p>
                                    <p>{userProfile.address}</p>
                                </div>
                            </div>
                            <button className="save-changes" onClick={handleEditProfile}>Edit profile</button>
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
                                editProfile.map(({ name, accept, value, placeHolder, type }, index) => {
                                    return (
                                        (index === 0) ?
                                            (
                                                <label htmlFor="fileupload" key={index}>
                                                    Updload
                                                    <input id="fileupload" type={type} className="files-input" onChange={handleChange} name={name} accept={accept} placeholder={placeHolder} />
                                                </label>
                                            )
                                            :
                                            (
                                                <input onChange={handleChange} type={type} value={value} name={name} placeholder={placeHolder} key={index} />
                                            )
                                    )
                                })
                            }
                            <button className="save-changes" onClick={handleUpdateProfile}>Update profile</button>
                        </div>
                    )
            }
        </>
    )
}

export default Profile;