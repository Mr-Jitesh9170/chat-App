const jwt = require("jsonwebtoken")

exports.verifyJwtToken = async (req, res, next) => {
    let token = req.header("Authorization");
    if (!token) {
        return res.status(401).json({ message: "Access denied, No token provided!" });
    }
    token = token.startsWith("Bearer ") ? token.slice(7) : token;
    try {
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
                if (err) {
                    return reject(new Error("Invalid or expired token!"));
                }
                resolve(decoded);
            })
        })
        req.user = decoded;
        next();
    } catch (error) {
        next(error)
    }
}