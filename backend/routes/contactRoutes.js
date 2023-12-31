const { sendEmail } = require("../controllers/emailControler")

const router = require("express").Router()

router.post("/contact",sendEmail)
module.exports=router