const User = require("../models/userShema");

module.exports.signUpCtrl = async (req,res) =>{
    console.log(req.body)

    const {firstName,lastName,email,password,image} = req.body

    try{
        const isExisting=await User.findOne({email:req.body.email})
        if (isExisting){
            res.status(400).json({message:"Email is already exits"})
        }
        
        if(image){
            console.log("yes image");
            await  User.create({
                firstName,lastName,email,password,image:req.body.image
            })
            
        }else{
            await  User.create({
                firstName,lastName,email,password
            })
        }
        res.status(201).json({message:"Account was created successfully"})
        


    }catch(error){
        console.log(error);
        return res.status(500).json(error)
    }
}

module.exports.loginCtrl = async (req,res) =>{
    console.log(req.body)
    try{
        const isExisting=await User.findOne({email:req.body.email,password:req.body.password})
        if (!isExisting){
            return res.status(400).json({message:"Invalid Email Or Password"})
        }

        res.status(200).json(isExisting)
    }catch(error){
        return res.status(500).json(error)
    }
}