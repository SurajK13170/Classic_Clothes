const {CartModel} = require('../model/cart.model')
const express = require('express')
const cartRouter = express.Router()
const {auth} = require('../middel_Ware/auth')

cartRouter.get('/', auth, async(req, res)=>{
    try{
        const cart = await CartModel.find({userID:req.body.userID})
        res.status(200).json(cart)
    }catch(err){
        res.status(400).json({'err':err.message})
    }
})

cartRouter.post('/addtocart', auth, async(req, res)=>{
    try{
        const cart = new CartModel(req.body)
        await cart.save()
        res.status(200).json({'msg':'added to cart!'})
    }catch(err){
        res.status(400).json({'err':err.message})
    }
})

cartRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await CartModel.findByIdAndDelete({ _id: id });
      res.status(200).json({ msg: 'product deleted' });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });
  
  cartRouter.patch('/update/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
      const cart = await CartModel.findByIdAndUpdate({ _id: id }, req.body);
      res.status(200).json({ msg: 'product updated' });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  });


module.exports = {cartRouter}