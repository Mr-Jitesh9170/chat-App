import { useState } from "react"
import "../styles/profile.scss"
const Profile = () => {
    const [profile, setProfile] = useState(false);
    const [input, setInput] = useState(
        {
            file: "",
            name: "",
            email: "",
            number: "",
            address: ""
        }
    );

    // Edit profile data =>
    const editProfile = [
        {
            name: "file",
            accept: "image/*",
            type: "file",
            value: input.file
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
        setInput({ ...input, [name]: name === "file" ? files[0] : value })
        console.log(input)
    }

    // updating profiles=>
    const handleUpdate = (e) => {
        e.preventDefault();
    }
    
    return (
        <div className="profile-container">
            {
                profile ?
                    (
                        <div className="view-profile-container"></div>
                    )
                    :
                    (
                        <div className="edit-profiles-container">
                            <div className="preview-profiles-container">
                                <img className="profile-photo" src={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} alt="profile-photo" />
                            </div>
                            {
                                editProfile.map(({ name, accept, value, placeHolder, type }, key) => {
                                    return key === 0 ? <label htmlFor="fileupload">Updload<input id="fileupload" value={value} type={type} className="files-input" onChange={handleChange} name={name} accept={accept} placeholder={placeHolder} key={key} /></label> : <input onChange={handleChange} type={type} value={value} name={name} placeholder={placeHolder} key={key} />
                                })
                            }
                            <button className="save-changes" onClick={handleUpdate}>Update profile</button>
                        </div>
                    )
            }
        </div>
    )
}

export default Profile;