const UserProfiles = require("../models/register.js");


exports.getProfileControllers = async (req, res, next) => {
    let { _id } = req.body;
    if (!_id) {
        return res.status(400).json({ message: "Missing _Id field!" })
    }
    try {
        let userProfile = await UserProfiles.findById(_id).select("-password")
        if (!userProfile) {
            return res.status(404).json({ message: "User Profile not found!" })
        }
        res.status(200).json({ message: "User Profile!", userProfile })
    } catch (error) {
        next(error)
    }
}