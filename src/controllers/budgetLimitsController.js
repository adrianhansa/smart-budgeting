const BudgetLimit = require('../models/BudgetLimit')
const validator = require('validator')

const createBudgetLimit = async (req,res)=>{
    try{
        const {limit, month, year} = req.body
        if(!limit || !validator.isNumeric(limit)){
            return res.status(400).json({message:"This limit is required and it has to contain a positive number"})
        }
        const budgetLimit = await BudgetLimit.create({limit, user:req.user, account:req.params.account, month, year})
        if(!budgetLimit) return res.status(400).json({message:"Budget limit for this account could not be created."})
        res.status(200).json(budgetLimit)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getBudgetLimit = async (req,res)=>{
    try{
        const budgetLimit = await BudgetLimit.findById(req.params.id)
        if(!budgetLimit) return res.status(404).json({message:"Record not found."})
        res.status(200).json(budgetLimit)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const updateBudgetLimit = async (req,res)=>{
    try{
        const {limit} = req.body
        if(!validator.isNumeric(limit) || limit >= 0){
            return res.status(400).json({message:"The budget amount has to be a number equal or greater than 0."})
        }
        const budgetLimit = await BudgetLimit.findByIdAndUpdate(req.params.id,{limit},{new:true})
        res.status(200).json(budgetLimit)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deleteBudgetLimit = async (req,res)=>{
    try{
        const budgetLimit = await BudgetLimit.findByIdAndDelete(req.params.id)
        if(!budgetLimit) return res.status(404).json({message:"Record not found."})
        res.status(200).json({message:"Budget limit for this account has been removed."})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {createBudgetLimit,updateBudgetLimit,getBudgetLimit,deleteBudgetLimit}