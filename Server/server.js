require('dotenv').config()

const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
app.use(express.json()); // Parse JSON bodies

// Routes
const auth_route = require('./routes/auth_route')
const mediaRoute = require('./routes/instructor_routes/media_route')
const courseRoute = require('./routes/instructor_routes/course_route')
const studentRoute = require('./routes/student_routes/index')
const studentViewOrderRoutes = require('./routes/student_routes/order_routes')

app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use('/api/auth', auth_route)
app.use('/api/media', mediaRoute)
app.use('/api/course', courseRoute)
app.use('/api/student/course',studentRoute )
app.use('/api/student/order',studentViewOrderRoutes)
    



mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("connected to mongoose")})
    .catch((err) => { console.log(err)  })

app.listen(8800, () => {
    console.log("Server is running")
})  