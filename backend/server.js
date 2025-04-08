const express=require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require("dotenv").config()
const storyRoutes =require('./routes/storyRoutes')
const authRoutes = require('./routes/authRoutes')
const quizRoutes = require('./routes/quizRoutes')
const app=express()
const path=require('path')
app.use(express.json()); 
app.use(cors())

mongoose.connect(process.env.MONGO_URI)
        .then(()=>console.log("Connected to MongoDB"))
        .catch((err)=>console.log(err))

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://kidslearneasy.netlify.app"
        ],
        credentials: true
        })
);

app.get('/health',(req,res)=>{
    res.send("Kids learning backend is running")
})

app.use('/api/auth',authRoutes)
app.use("/stories", express.static(path.join(__dirname, "public/stories")));
app.use('/stories',storyRoutes)
app.use('/quizzes',quizRoutes)

const PORT=process.env.PORT ||5000
app.listen(PORT,()=>console.log(`Server running on port ${PORT}`))