import "../styles/profile.scss"
const Profile = () => {
    const profile = [
        {
            icon: "👥",
            data: "Jitesh Pandey"
        },
        {
            icon: "📱",
            data: "9170006101"
        },
        {
            icon: "📧",
            data: "mr.jiteshpandey9170@gmail.com"
        }
    ]

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
                <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
            </div>
            {
                profile.map((_) => {
                    return (
                        <div className="profiles">
                            <div className="name-icons">{_.icon}</div>
                            <div className="name">{_.data}</div>
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