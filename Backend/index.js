const express = require('express')
const {connection} = require('./db')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
require('dotenv').config()
app.use(express.json())
app.use(cors())

const {userRouter} = require('./router/User.rout')
const {prodRoute} = require('./router/Product.route')
const {cartRouter} = require('./router/cart.route')
const PORT = process.env.PORT

app.use('/user', userRouter)
app.use('/product', prodRoute)
app.use('/cart', cartRouter)



app.listen(`${PORT}`, async(req, res)=>{
    try{
        connection
        console.log('Connected to DB')

    }catch(err){
        console.log('Not Connected')
    }
    console.log(`Server is Running at Port ${PORT}`)
})