const User = require('../models/User')
const bcrypt = require('bcryptjs')

const register = async (req,res)=>{
    try{
        //
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