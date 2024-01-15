const {User,Post}=require('../models')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const jwtsecret="asfdjkdfjldddddvdfndifsddfrgfkgnvoiloveu"

const Register=async(req,res)=>{
     const{Email,firstName,lastName,Password}=req.body
     
     const img=req.file.filename
     
     const user=await User.findOne({where:{email:Email}})
     try{
        if(user){
            res.status(200).json({message:"User already exist please login to continue"})
        }
        else{
           const hash=await bcrypt.hash(Password,10)
                const addedTask= await  User.create({email:Email,fistName:firstName,lastName:lastName,password:hash,profilepic:img})
                // await addedTask.save()
                res.status(201).json({message:"User registered successfully",data:addedTask})
            }
          
        }
        catch(err){
            res.status(404).json(`the error is ${err}`);
         }
     }
     
        


const Login=async(req,res)=>{
    const {Email,Password}=req.body
    const user=await User.findOne({where:{email:Email}})
    console.log(user);
    try{
        if(user){
           const data=await bcrypt.compare(Password, user.password)

           if(data){
            const maxAge=10*60*60
            const token=jwt.sign({uuid:user.uuid},jwtsecret,{expiresIn:maxAge})
            res.status(200).json({message:"Login Successful",token:token,user:user})
           }
           else{
             res.status(200).json({message:"Incorrect password"})
           }
        }
        else{
            res.status(200).json({message:"User not found please register first"})
        }
    }
    catch(err){
        console.log(err);
    }

}








const post=async(req,res)=>{
    const{UUID,caption}=req.body
    const img=req.file.filename
    try{
        const user= await  User.findOne({where:{uuid:UUID}})
        console.log(user.uuid);
        const post=await Post.create({userName:user.fistName,userImg:user.profilepic,email:user.email,uuid:user.uuid,image:img,caption:caption})
           // await addedTask.save()
           res.status(201).json({message:"Image has been uploaded",post:post})
    }
       
    catch(err){
        res.status(404).json(err)
    }

}


const getAll=async(req,res)=>{
    try{
        const getalldata= await Post.findAll()
        res.status(200).json(getalldata)
    }
   catch(err){
    res.status(404).json(err)
   }
}


const getIndivitualdata=async(req,res)=>{
    const UUID=req.params.uuid
    
    try{
        const indivtual=await Post.findAll({where:{uuid:UUID}}) 
        if(indivtual){
            res.status(200).json(indivtual)
        }
        else{
            res.status(404).json({message:'Not Found'})
        }
        
    }
    catch(err){
        res.status(404).json(err)
    }
}

// const updateData=async(req,res)=>{
//     const {id,caption} =req.body
//     const img=req.file.filename
    
//     try{
//         const updatedData=await Post.findOne({where:{id:id}})
//         if(updatedData){
//             updatedData.caption=caption
//             updatedData.image=img
//             await updatedData.save()
//             res.status(200).json(updatedData)
//         }
//         else{
//             res.status(200).json({message:id})
//         }
    
//     }
//     catch(err){
//         res.status(200).json(err)
//     }
// }

const updateData = async (req, res) => {
    const { id, caption } = req.body;
    const img = req.file.filename;
  
    try {
      const updatedRowsCount = await Post.update(
        { caption, image: img },
        { where: { id } }
      );
  
      if (updatedRowsCount) {
        res.status(200).json({message:"Data has been updated"});
      } else {
        res.status(404).json({ message: `Post with ID ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  


const DeletePost=async(req,res)=>{
    const id=req.params.id

    try{
        const Data=await Post.destroy({where:{id:id}})

        
        if(Data){
            res.status(200).json({message:'data deleted '})
        }
        else{
            res.status(404).json({message:"Not Found"})
        }
        

    }
    catch(err){
        res.status(404).json(err)
    }
}


const EditFunction=async(req,res)=>{
    const id=req.params.id
    
    try{
        const editableData=await Post.findOne({where:{id:id}})
        // console.log(editableData);
        if(editableData){
           res.status(200).json({data:editableData})
        }
        else{
            res.status(404).json({message:"Not found"})
        }
    }
    catch(err){
        res.status(402).json(err)
    }
    
}


// const ForgotPassword =async (req,res)=>{
//     const {Email,Password}=req.body



//     const user=await User.findOne({where:{email:Email}})
//     try{
//         if(user){
//             const hash=await bcrypt.hash(Password,10)
//             const updatedRowsCount = await User.update(
//                 { password : hash },
//                 { where: { email:Email } }
//               );

//               if (updatedRowsCount) {
//                 res.status(200).json({message:"Data has been updated"});
//               } else {
//                 res.status(404).json({ message: `User not found` });
//               }
//             } 
//             }
              
//             catch (err) {
//                 res.status(500).json({ error: err.message });
//               }

// }



const ForgotPassword = async (req, res) => {
    try {
        const { Email, Password } = req.body;

        const user = await User.findOne({ where: { email: Email } })

        if (user) {
            const hash = await bcrypt.hash(Password, 10)
            const updatedRowsCount = await User.update(
                { password: hash },
                { where: { email: Email } }
            )

            if (updatedRowsCount) {
                return res.status(200).json({ message: "Password has been updated" });
            } else {
                return res.status(404).json({ message: `Unable to Update Please Try Again Later` });
            }
        } else {
            return res.status(404).json({ message: `User not found register first` });
        }
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};


module.exports={Register,post,Login,getAll,getIndivitualdata,updateData,DeletePost,EditFunction,ForgotPassword}