
const mongoose = require("mongoose")
require("dotenv").config()

const database = mongoose.connect(process.env.murl)

module.exports= {database}