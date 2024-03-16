const { Router } = require("express")
const { userRegister, userLogin } = require("../controllers/authControllers")

const router = Router()

router.post("/register", userRegister);

router.post("/login", userLogin);

module.exports = router;