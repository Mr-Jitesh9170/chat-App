const User = require("../models/register.js")

// middleware =>
exports.sessionChecker = async (req, res, next) => {
    if (req.session.userId) {
        console.log("True , I am middleware!")
        const user = await User.findOne({ _id: req.session.userId });
        if (user && user.sessionId === req.sessionID) {
            next();
        } else {
            res.status(401).send('Session expired. Please log in again.');
        }
    } else {
        res.status(401).send('Not authenticated');
    }
};