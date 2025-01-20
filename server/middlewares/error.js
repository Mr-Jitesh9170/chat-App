exports.errorHanlder = async (err, req, res, next) => {
    console.error(err.stack);
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error!"
    res.status(statusCode).json({ message })
} 