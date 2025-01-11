const { Router } = require("express")
const { userRegister, userLogin, getUserRegister } = require("../controllers/authControllers")

const router = Router()

router.post("/register", userRegister);
router.post("/login", userLogin);
 
module.exports = router;