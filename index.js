
const express = require("express")
const { database } = require("./configs/db")
const { auth } = require("./middleware/authentication.middleware")
const { postRoutes } = require("./routes/post.users")
const { userRoutes } = require("./routes/user.routes")
const cors = require("cors")

const app = express()
app.use(cors())
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to backend")
})
app.use("/user",userRoutes)
app.use(auth)
app.use("/post",postRoutes)

app.listen(process.env.port,async(req,res)=>{
    try {
        await database
        console.log("connected to database")
        console.log(`http://localhost:${process.env.port}`)
    } catch (error) {
        console.log(err)
    }
})