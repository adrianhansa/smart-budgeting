const User = require('../models/User')
const bcrypt = require('bcryptjs')
const sendToken = require('../utils/sendToken')

const register = async (req,res)=>{
    try{
        const {name,email,password,passwordVerify} = req.body
        if(!name || !email || !password) return res.status(400).json({message:"All fields are required"})
        if(password.length < 6) return res.status(400).json({message:"The password must contain at least 6 characters."})
        if(password !== passwordVerify) return res.status(400).json({message:"The two passwords do not match"})
        const existingUser = await User.findOne({email})
        if(existingUser) return rees.status(400).json({message:"This email has already been registered. Please login."})
        const passwordHashed = await bcrypt.hash(password,10)
        const user = await User.create({name,email,password:passwordHashed})
        sendToken(user,200,res)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const login = async (req,res)=>{
    try{
        //
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const resetPassword = async (req,res)=>{
    try{
        //
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deleteAccount = async (req,res)=>{
    try{
        //
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {register,login,deleteAccount}