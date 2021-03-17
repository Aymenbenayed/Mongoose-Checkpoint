//1require express
const express = require ('express')

//2-instance of express 
const app = express()

//4-require .env 
require('dotenv').config()

//7-Middleware
app.use(express.json())

// 5-conenct to DB 
const connectDB = require ('./config/connectDB.js')
connectDB()

//6-Routes
app.use(require('./routes/user'))

//3-PORt
const PORT = process.env.PORT

//4- create server 
app.listen (PORT, error => 
    error ? console.error(error)
    : 
    console.log(`Server is running on port ${PORT} ...`)
    )