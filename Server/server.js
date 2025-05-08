require('dotenv').config()

const express = require("express")
const app = express()
const cors = require('cors')
const mongoose = require("mongoose")
app.use(express.json()); // Parse JSON bodies

// Routes
const auth_route = require('./routes/auth_route')

app.use(cors({
    origin:"http://localhost:5173/",
    credentials:true,
    allowedHeaders: ['Content-Type', 'Authorization']
}))

mongoose.connect(process.env.MONGO_URI)
    .then(() => {console.log("connected to mongoose")})
    .catch((err) => { console.log(err)  })
   
app.use('/api/auth', auth_route)


app.listen(8800, () => {
    console.log("Server is running")
})  