const mongoose = require('mongoose')

const productschema = mongoose.Schema({
    title:{type:String, required:true},
    price:{type:Number, required:true},
    img:{type:String, required:true},
    quantity:{type:Number, required:true},
    category:{type:String, required:true}
})

const ProductModel = mongoose.model('product', productschema)

module.exports = {ProductModel}