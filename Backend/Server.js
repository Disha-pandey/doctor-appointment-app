import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import adminRouter from './routes/adminRoute.js'
import userRouter from './routes/userRoute.js'
import doctorRouter from './routes/doctorRoute.js'

const app=express()
const port=process.env.PORT || 4000
connectDB()
connectCloudinary()
// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true })); // for form submissions
app.use(cors())
// api end points
app.use('/api/admin',adminRouter)
console.log("✅ Admin routes loaded.");

app.use('/api/doctor',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    res.send('API WORKING')
})
app.listen(port,()=>console.log("Server Started",port))