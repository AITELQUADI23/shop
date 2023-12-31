module.exports.newProductCtrl =async(req,res)=>{
    console.log(req.body)
    
    const data=await productModel(req.body)
    const datasave= await data.save()
    res.send({message : "Upload successfully"})
}