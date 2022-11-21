const express=require("express")
const app=express()
app.use(express.json())
require('dotenv').config()


const connection=require("./config/config")
const userRoutes= require("./routes/userRoutes")
const projectRoutes=require("./routes/projectRoutes")
const taskRoutes=require("./routes/taskRoutes")

app.get("/",(req,res)=>{
    return res.send("Home Page")
})

app.use("/user",userRoutes)
app.use("/projects",projectRoutes)
app.use("/tasks",taskRoutes)

app.listen(process.env.PORT,async()=>{
    try{
        await connection
        console.log("DB Connected");

    }
    catch(error){
        console.log(error);
    }
    console.log(`DB Connected at port ${process.env.PORT}`);
})