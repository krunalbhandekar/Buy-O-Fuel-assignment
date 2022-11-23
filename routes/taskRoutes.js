const express=require("express")
const taskRoutes=express.Router()
const taskModel=require("../model/taskModel")
const authentication=require('../middleware/authentication')


//get all tasks
taskRoutes.get("/",async(req,res)=>{
    const alltask=await taskModel.find()
    const count=await taskModel.countDocuments()
    return res.send({message:"all task",data:alltask,total:count})
})

//get report

taskRoutes.get("/report/:startdate/:enddate",async(req,res)=>{
const {startdate,enddate}=req.params
console.log('startdate:', startdate)


    const data=await taskModel.aggregate([
        {$match:{createDate:{$gte:startdate.toString(),$lte:enddate.toString()}}},
        {$group:{_id:{date:"$createDate"},added:{$count:{}},}},

    ])
    return res.send(data)
})

 //get specific project tasks
taskRoutes.get("/:projectid",authentication,async(req,res)=>{
    const {projectid}=req.params
    const projecttask=await taskModel.find({projectid})
    const count=await taskModel.find({projectid}).countDocuments()
    return res.send({message:"project task",data:projecttask,total:count})
}) 

//create tasks
taskRoutes.post("/create/:projectid",authentication,async(req,res)=>{
    const {projectid}=req.params
    const {taskname,description}=req.body
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();
    const currentDate=(`${yyyy}-${mm}-${dd}`)
    const newTask=new taskModel({
        projectid,taskname,description,createDate:currentDate
    })
    await newTask.save()
    return res.send({message:"new task add",data:newTask})
})

//edit task- isCompleted become true
taskRoutes.put("/edit/:taskid",async(req,res)=>{
    const {taskid}=req.params
    let updatetask=await taskModel.findOneAndUpdate({_id:taskid},req.body,{new:true})
    res.send({message:"task update",data:updatetask})
})

//delete task
taskRoutes.delete("/delete/:taskid",authentication,async(req,res)=>{
    const {taskid}=req.params
    await taskModel.findOneAndDelete({_id:taskid})
    res.send({message:"task delete"})
})
  

module.exports=taskRoutes