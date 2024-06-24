const UserProfiles = require("../models/register.js")


// Update User Profile =>
exports.updateProfileControllers = async (req, res) => {
    try {
        let { _id, profilePhoto, name, number, email, address } = req.body;
        let updatedData = await UserProfiles.findByIdAndUpdate(_id, { profilePhoto, name, number, email, address }, { new: true }).select("-password")
        res.json(
            {
                status: 200,
                massage: "User Profile Updated",
                results: updatedData
            }
        )
    } catch (error) {
        console.log(error, "<---- profile not updated")
        res.json(
            {
                status: 500,
                massage: "Internal server error"
            }
        )
    }
}

exports.getProfileControllers = async (req, res) => {
    try {
        let { _id } = req.body;
        let responseUserProfile = await UserProfiles.findById(_id).select("-password")
        console.log(responseUserProfile)
        res.json(
            {
                status: 200,
                massage: "User profile",
                results: responseUserProfile
            }
        )
    } catch (error) {
        console.log(error, "<---- user profile not retrieved")
        res.json(
            {
                status: 500,
                massage: "Internal server error",
            }
        )
    }
}