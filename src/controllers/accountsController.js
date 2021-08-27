const Account = require('../models/Account')
const slugify = require('slugify')

const createAccount = async (req,res)=>{
    try{
        const {name}= req.body
        if(!name) return res.status(400).json({message:"Account name is required."})
        const slug = slugify(name, {lower:true,remove: /[*+~.()'"!?:@]/g})
        const existingAccount = await Account.findOne({slug})
        if(existingAccount) return res.status(400).json({message:"This account already exists. Please create a different one."})
        const account = await Account.create({name,slug,user:req.user})
        res.status(200).json(account)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getAccounts = async (req,res)=>{
    try{
        const accounts = await Account.find({user:req.user})
        res.status(200).json(accounts)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}


const getAccount = async (req,res)=>{
    try{
        const account = await Account.findOne({user:req.user,slug:req.params.slug})
        if(!account) return res.status(404).json({message: "Account not found."})
        res.status(200).json(account)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const updateAccount = async (req,res)=>{
    try{
        const {name} = req.body
        if(!name) return res.status(400).json({name:"Name must be provided."})
        //check if new name is different from existing one providing the initial slug
        console.log(req.user)
        console.log(req.params.slug)
        const existingAccount = await Account.findOne({user:req.user,slug:req.params.slug})
        if(existingAccount.name === name) return res.status(200).json({account:existingAccount})
        const newSlug = slugify(name, {lower:true,remove: /[*+~.()'"!?:@]/g})
        //check if the new name exists in the database for this user
        const existingName = await Account.findOne({user:req.user,slug:newSlug})
        if(existingName) return res.status(400).json({message:"You have already created an account with this name."})
        const account = await Account.findOneAndUpdate({user:req.user,slug:existingAccount.slug},{name,slug:newSlug},{new:true})
        res.status(200).json(account)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deleteAccount = async (req,res)=>{
    try{
        const account = await Account.findOneAndDelete({user:req.user,slug:req.params.slug})
        if(!account) return res.status(404).json({message:"Account not found."})
        res.status(200).json({message:"Account deleted successfully."})
    }catch(error){
        return res.status(500).json({error:error.message})
    }
}

module.exports = {createAccount,getAccounts,getAccount,updateAccount,deleteAccount}