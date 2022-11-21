const express=require("express")
var jwt = require('jsonwebtoken');
const bcrypt  = require("bcrypt")
const userRoutes=express.Router()
const userModel=require("../model/userModel")

userRoutes.post("/register",async(req,res)=>{
    const {username,password}=req.body
     await bcrypt.hash(password, 6, async function(err, hash) {
        if(err){
            return res.send("Password Error, Please try again...")
        }
        const user = new userModel({
            username,
            password : hash
        })
        await user.save();
         return res.send({ message: "Signup successfull", user: user})
    });
})

userRoutes.post("/login",async(req,res)=>{
    const {username,password}=req.body
    const user = await userModel.findOne({username})
  
    if(!user){
        return res.send("Login Failed, User Not Found!");
    }
    const hash = user.password;
    
    await bcrypt.compare(password, hash, function(err, result) {
       if(err){
        return res.send("Login Failed, please try again later")
    }

    if(result){
        const token=jwt.sign({username:user.username,userid:user._id},"shhhhh")
        
        return res.send({message:"login succesfully",token:token})
    }
    else{
        res.send("invalid password")
    }
    });
    
})

module.exports=userRoutes