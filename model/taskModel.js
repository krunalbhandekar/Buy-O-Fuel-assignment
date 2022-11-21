const mongoose=require("mongoose")

const taskSchema=new mongoose.Schema({
    projectid:{type:String, required:true},
    taskname:{type:String, required:true},
    description:{type:String, required:true},
    isCompleted:{type:Boolean, required:true, default:false}
},{ timestamps: true }
)
const taskModel=mongoose.model("task",taskSchema)

module.exports=taskModel