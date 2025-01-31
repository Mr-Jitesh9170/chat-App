import { useParams } from "react-router-dom";
import { ProfileIcon } from "../components/profileIcon/profileIcon";
import "../styles/outgoingCall.scss"
import { HiSpeakerWave } from "react-icons/hi2";
import CallDecline from "./../Assests/callDecline.png"
import { BsMicMute } from "react-icons/bs";

const CallingProfile = () => {
    const { callerId } = useParams()
    return (
        <>
            <div className="callingContainer">
                <div className="callerDetails">
                    <div class="call-animation">
                        <ProfileIcon width={"160px"} height={"160px"} />
                    </div>
                    <h5 className="callerName">Aman Chauhan!</h5>
                    <span className="isconnecting">Calling....</span>
                </div>
                <div className="callActions">
                    <HiSpeakerWave size={45} />
                    <BsMicMute size={45} />
                </div>
                <div className="callDecline ">
                    <ProfileIcon img={CallDecline} width={"50px"} height={"50px"} />
                </div>
            </div>
        </>
    )
}



export default CallingProfile;