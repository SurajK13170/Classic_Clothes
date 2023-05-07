const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    img:{type:String, required:true},
    quantity:{type:Number, required:true},
    category:{type:String, required:true},
    user:{type:String, required:true},
    userID:{type:String, required:true}
})

const CartModel = mongoose.model('cart', cartSchema)

module.exports = {CartModel}