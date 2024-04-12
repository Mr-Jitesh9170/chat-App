import { useEffect, useState } from "react";
import "../styles/profile.scss";
import { userProfileUpdate } from "../APIs/api";
import { getProfileUser } from "../APIs/api";
import { Header } from "./header";
import { editProfile } from "../data/AllData";

const Profile = () => {
    // user data =>
    const [userProfile, setUserProfile] = useState();
    const [profile, setProfile] = useState(true);
    const [input, setInput] = useState(
        {
            _id: localStorage.getItem("token"),
            profilePhoto: userProfile?.profilePhoto,
            name: userProfile?.name,
            email: userProfile?.email,
            number: userProfile?.number,
            address: userProfile?.address
        }
    );

    // User Profile data =>
    useEffect(() => {
        getProfileUser(setUserProfile, input._id);
    }, [profile])

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
            <Header heading={"Profile"} />
            {
                profile ?
                    (
                        <div className="view-profile-container">
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
                                    <p>{userProfile?.name}</p>
                                    <p>{userProfile?.email}</p>
                                    <p>{userProfile?.number}</p>
                                    <p>{userProfile?.address}</p>
                                </div>
                            </div>
                            <button className="save-changes" onClick={handleEditProfile}>Edit profile</button>
                        </div>
                    )
                    :
                    (
                        <div className="edit-profiles-container">
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
                                                <input onChange={handleChange} type={type} value={input[`${name}`]} name={name} placeholder={placeHolder} key={index} />
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