const {UserModel} = require('../model/User.model')
const express = require('express')
const userRouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')


userRouter.post('/register', async(req , res)=>{
    const {name, age, email, pass, city} = req.body
    try{
        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            return res.status(401).send('User with this email already exists')
        }
        bcrypt.hash(pass, 5 , async(req, hash)=>{
            const user = new UserModel({name, email, age, city, pass:hash})
            await user.save()
            res.status(200).json({'msg':'Register Successfull !'})
        })
    }catch(err){
        res.status(500).json({'err':err.message})
    }
})

userRouter.post('/login', async(req, res)=>{
    const {email, pass} = req.body;
    try{
        const user = await UserModel.findOne({email})
        if(user){
            bcrypt.compare(pass, user.pass, (err, result)=>{
                if(result){
                    const token = jwt.sign({userID:user._id, user:user.name}, 'classic_clothes')
                    res.status(200).json({'msg':'Login Success', 'token':token, user:user.name})
                }else{
                    res.json('Wrong Password!')
                }
            })
        }else{
            res.json('Wrong Password!')
        }
    }catch(err){
        res.status(500).json({'err':err.message})
    }
})

module.exports = {userRouter}