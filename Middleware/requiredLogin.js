const jwt = require('jsonwebtoken')
const JWT_SECRET = process.env.JWT_SECRET
const mongoose = require('mongoose')
const Admin = mongoose.model("Admin")
const Customer = mongoose.model('Customer')
module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        return res.status(401).json({error:"you must be logged in"})
    }
    const token = authorization.replace("Bearer ","")
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return   res.status(401).json({error:"you must be logged in"})
        }

        const {_id} = payload
        Customer.findById(_id)
            .then(userdata=>{
                if(!userdata){
                    Admin.findById(_id)
                        .then(newdata=>{
                            userdata = newdata
                        })
                }
                req.user = userdata
                next()
            })

    })
}
