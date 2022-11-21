var jwt = require('jsonwebtoken');

const authentication=(req,res,next)=>{
    const header=req.headers.authorization
    if(header){
        const usertoken=header.split(" ")[1]
        jwt.verify(usertoken,"shhhhh",function(err,decoded){
            if(err){
                return res.send("you are not authenticated")
            }
            req.body.userid=decoded.userid
            next()
        })
    }
}


module.exports=authentication