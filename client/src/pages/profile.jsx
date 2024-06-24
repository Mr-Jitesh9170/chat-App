import { useEffect, useState } from "react"
import "../styles/profile.scss"
import { getProfileUser } from "../APIs/api"

const Profile = () => {
    const [profile, setProfile] = useState({});
    let updatedProfile = [{ name: profile.name, icon: "👥", }, { name: profile.number, icon: "📱", }, { name: profile.email, icon: "📧", }]
    useEffect(() => {
        getProfileUser(setProfile, localStorage.getItem("token"))
    }, [])
    const socialMedias = [
        {
            name: "Linkdin",
            link: "https://cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png",
        },
        {
            name: "Github",
            link: "https://cdn-icons-png.freepik.com/512/3128/3128308.png"
        },
        {
            name: "instagram",
            link: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Instagram_icon.png/2048px-Instagram_icon.png",
        }
    ]

    return (
        <div className="profile-container">
            <div className="profile-photo">
                <img src={profile.profilePhoto} alt="" />
            </div>
            {
                updatedProfile.map((_) => {
                    return (
                        <div className="profiles">
                            <div className="name-icons">{_.icon}</div>
                            <div className="name">{_.name}</div>
                        </div>
                    )
                })
            }
            <div className="social-meida">
                {
                    socialMedias.map((_) => {
                        return (
                            <div className="icons">
                                <img src={_.link} alt="" />
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default Profile;