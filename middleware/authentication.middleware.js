
const jwt = require("jsonwebtoken")

const auth = (req,res,next)=>{
    try {
        let token = req.headers.authorization
        let user = jwt.verify(token,"shhhh")
        req.body.user = user.userID
        next()
    } catch (err) {
        res.send("authentication error")
    }
}

module.exports= {auth}