const { signUpCtrl } = require("../controllers/userController")

const router = require("express").Router()

// api/auth/signup
router.post("/signup",signUpCtrl)






module.exports=router