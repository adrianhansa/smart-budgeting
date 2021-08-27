const Account = require('../models/Account')
const slugify = require('slugify')

const createAccount = async (req,res)=>{
    try{
        const {name}= req.body
        if(!name) return res.status(400).json({message:"Account name is required."})
        const slug = slugify(name, {lower:true,remove: /[*+~.()'"!?:@]/g})
        const account = await Account.create({name,slug})
        res.status(200).json(account)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getAccounts = async (req,res)=>{
    try{
        const accounts = await Account.find()
        res.status(200).json(accounts)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {createAccount,getAccounts}