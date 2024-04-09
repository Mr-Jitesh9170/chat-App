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