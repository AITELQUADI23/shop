//npm run dev
const express=require("express");
const cors=require("cors");
const Db = require("./config/Db");
const { default: mongoose } = require("mongoose");
require("dotenv").config()
const app=express()
const PORT=process.env.PORT  || 8080
Db()

app.use(express.json({limit:"10mb"}))
app.use(cors())
app.use("/api/auth",require("./routes/loginRoutes"))    
app.use("/api/auth",require("./routes/userRoutes"))
app.use("/api",require("./routes/contactRoutes"))
app.use("/api/newproduct",require("./routes/newProductRoutes.js"))


app.get("/",(req,res)=>{
    res.send("server is running")
    
})


app.listen(process.env.PORT,()=>console.log("server is running at port :"+ PORT))