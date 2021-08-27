const Expense = require('../models/Expense')

const createExpense = async (req,res)=>{
    try{
        const amount = Number(req.body.amount)
        if(!amount) return res.status(400).json({message:"Amount spent is required."})
        const account = req.body.account
        if(!account) return res.status(400).json({message:"Please select an account."})
        const description = req.body.description
        if(!description) return res.status(400).json({message:"Please enter a description."})
        const expense = await Expense.create({user:req.user,account,amount,description,date:Date.now()})
        res.status(200).json(expense)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getExpense = async (req,res)=>{
    try{
        const expenses = await Expense.find({user:req.user})
        res.status(200).json(expenses)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getExpenses = async (req,res)=>{
    try{
        const expenses = await Expense.find({user:req.user})
        res.status(200).json(expenses)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const updateExpense = async (req,res)=>{
    try{
        //
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deleteExpense = async (req,res)=>{
    try{
        //
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {createExpense, updateExpense, deleteExpense, getExpense, getExpenses}