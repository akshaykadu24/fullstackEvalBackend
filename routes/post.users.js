
const express = require("express")
const { PostModel } = require("../models/post.model")
const jwt = require("jsonwebtoken")

const postRoutes = express.Router()

postRoutes.get("/",async(req,res)=>{
    
    try {
        let user = req.body.user
        let users = await PostModel.find({user})
        
        res.send(users)
    } catch (err) {
        res.send("err while createing post")
    }
})

postRoutes.post("/create",async(req,res)=>{
    let data = req.body
    try {
        let user = new PostModel(data)
        await user.save()
        res.send({msg:"post created"})
    } catch (err) {
        res.send("err while createing post")
    }
})


postRoutes.patch("/update/:id",async(req,res)=>{
    let id = req.params.id
    let payload = req.body
    try {
        await PostModel.findByIdAndUpdate(id,payload)
        res.send({msg:"post updated"})
    } catch (err) {
        res.send("err while updating post")
    }
})
postRoutes.delete("/delete/:id",async(req,res)=>{
    let id = req.params.id
    try {
        await PostModel.findByIdAndDelete(id)
        res.send({msg:"post deleted"})
    } catch (err) {
        res.send("err while deleting post")
    }
})

module.exports = {postRoutes}