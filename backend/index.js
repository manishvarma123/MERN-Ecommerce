const express = require("express")
const cors = require('cors')
require('dotenv').config()
const connectDB = require('./config/db')
const router = require("./routes")
const cookieParser = require('cookie-parser')

const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
// app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.get("/",(req,res)=>{
    res.send("Welcome to the backend server")
})
app.use("/api",router)

const PORT = process.env.PORT || 8080

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log("connect to DB")
        console.log("Server is running..")
    })
})
