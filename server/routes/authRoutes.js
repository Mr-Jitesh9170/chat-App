const { Router } = require("express")
const { userRegister, userLogin, getUserRegister, userLogout } = require("../controllers/authControllers")

const router = Router()

router.post("/register", userRegister);
router.get("/register", getUserRegister);
router.post("/login", userLogin);
router.post("/logout", userLogout);

module.exports = router;