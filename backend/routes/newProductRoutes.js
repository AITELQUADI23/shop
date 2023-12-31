const { newProductCtrl } = require("../controllers/newProductControler")

const router = require("express").Router()

// api/auth/signup
router.post("/newproduct",newProductCtrl)






module.exports=router