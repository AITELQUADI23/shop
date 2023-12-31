const { loginCtrl } = require("../controllers/userController")
const router = require("express").Router()

router.post("/login",loginCtrl)
module.exports=router