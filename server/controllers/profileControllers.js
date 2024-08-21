const UserProfiles = require("../models/register.js")
exports.getProfileControllers = async (req, res) => {
    try {
        let { _id } = req.body;
        let responseUserProfile = await UserProfiles.findById(_id).select("-password")
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