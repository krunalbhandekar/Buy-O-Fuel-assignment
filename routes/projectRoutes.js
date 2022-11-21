const express=require("express")
const projectRoutes=express.Router()
const authentication=require('../middleware/authentication')
const projectModel=require("../model/projectModel")

//get all projects
projectRoutes.get("/",async(req,res)=>{
    const allProject=await projectModel.find()
    const count=await projectModel.countDocuments()
    return res.send({message:"all projects",data:allProject,total:count})
})

//get specific user projects
projectRoutes.get("/:userid",authentication,async(req,res)=>{
    const {userid}=req.params
    if(userid===req.body.userid){
        const userProject=await projectModel.find({userid})
        const count=await projectModel.find({userid}).countDocuments()
        return res.send({message:"user projects",data:userProject,total:count})
    }else{
        return res.send("Please login again and try")
    }
})

//create project
projectRoutes.post("/create",authentication,async(req,res)=>{
    const {projectname,description,userid}=req.body
    const newProject=new projectModel({
        projectname,description,userid
    })
    await newProject.save()
    return res.send({message:"new project add",data:newProject})
})

//edit project
projectRoutes.put("/edit/:projectid",authentication,async(req,res)=>{
    const {projectid}=req.params
    let updateproject=await projectModel.findOneAndUpdate({_id:projectid},req.body,{new:true})
     res.send({message:"project update",data:updateproject})
})

//delete project
projectRoutes.delete("/delete/:projectid",authentication,async(req,res)=>{
    const {projectid}=req.params
    const {userid}=req.body
    const userproject=await projectModel.findOne({userid,_id:projectid})
    if(userproject){
        await projectModel.findOneAndDelete({_id:projectid})
        res.send({message:"project delete"})
    }else{
        res.send("Please login again and try again")
    }
})  

module.exports=projectRoutes