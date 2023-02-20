
const express = require("express")
const { UserModel } = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRoutes = express.Router()

// userRoutes.get("/",(req,res)=>{
//     res.send("a")
// })

userRoutes.post("/register",async(req,res)=>{
    let data = req.body
    let {email,password} = req.body
    let olduser = await UserModel.find({email})
    if(olduser.length>0){
        res.send("User already exist, please login")
    }else{

        try {
            bcrypt.hash(password,5,async(err,hash)=>{
                let user = new UserModel({...data,password:hash})
                await user.save()
                res.send("user registered")
            })
    
        } catch (err) {
            res.send("not registered")
            
        }
    }

})

userRoutes.post("/login",async(req,res)=>{
    let {email,password} = req.body

    try {
        let user = await UserModel.find({email})
        if(user.length>0){
            let token  = jwt.sign({userID:user[0]._id},"shhhh")
           let pass=  bcrypt.compare(password,user[0].password)
            if(pass){

                res.send({msg:"user registered",token})
            }else{
                res.send({msg:"wrong password"})
            }
                
        
        }else{
            res.send("invalid loginuser register first")
        }

    } catch (err) {
        res.send("not registered")
        
    }

})



module.exports = {userRoutes}