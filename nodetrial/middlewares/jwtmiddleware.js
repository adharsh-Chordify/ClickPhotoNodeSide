const jwt=require('jsonwebtoken')
const jwtsecret="asfdjkdfjldddddvdfndifsddfrgfkgnvoiloveu"
const {User}=require('../models')


const jwtmiddlewares=async(req,res,next)=>{
    const temptoken=req.headers.token
    const data=await jwt.verify(temptoken,jwtsecret)
    const userData= await User.findOne({where:{uuid:data.uuid}})
    if(!userData){
        return res.status(200).json({message:"Unauthorized access"})
    }
    else{
        next()
    }
}

module.exports=jwtmiddlewares