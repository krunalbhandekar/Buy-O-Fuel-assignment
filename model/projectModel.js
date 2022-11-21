const mongoose=require("mongoose")

const projectSchema=new mongoose.Schema({
    userid:{type:String, required:true},
    projectname:{type:String, required:true},
    description:{type:String, required:true}
},{ timestamps: true })
const projectModel=mongoose.model("project",projectSchema)

module.exports=projectModel