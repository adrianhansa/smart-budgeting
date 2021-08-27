const Expense = require('../models/Expense')

const createExpense = async (req,res)=>{
    try{
        const amount = Number(req.body.amount)
        if(!amount) return res.status(400).json({message:"Amount spent is required."})
        const account = req.body.account
        if(!account) return res.status(400).json({message:"Please select an account."})
        const description = req.body.description
        if(!description) return res.status(400).json({message:"Please enter a description."})
        const expense = await Expense.create({user:req.user,account,amount,description,date:Date.now(),month:new Date().getMonth()+1,year:new Date().getFullYear()})
        res.status(200).json(expense)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getExpense = async (req,res)=>{
    try{
        const expense = await Expense.findById(req.params.id).populate('account','name')
        if(!expense) return res.status(404).json({message:"Expense not found"})
        res.status(200).json(expense)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getExpenses = async (req,res)=>{
    try{
        const expenses = await Expense.find({user:req.user}).populate('account','name')
        res.status(200).json(expenses)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getExpensesByMonthAndYear = async (req,res)=>{
    try{
        const {month, year} = req.params
        if(!month || !year) return res.status(400).json({message:"Please select both the month and the year."})
        const expenses = await Expense.find({user:req.user}).where('year').equals(year).where('month').equals(month).populate('account','name')
        res.status(200).json(expenses)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const getExpensesByAccount = async (req,res)=>{
    try{
        const {account} = req.body
        if(!account) return res.status(400).json({message:"Please select the account."})
        const expenses = await Expense.find({user:req.user,account})
        res.status(200).json(expenses)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const updateExpense = async (req,res)=>{
    try{
        const {amount,description,date,account} = req.body
        //include date in the if below
        if(!amount || !description || !account) return res.status(400).json({message:"Please complete all fields."})
        const expense = await Expense.findByIdAndUpdate(req.params.id,{amount:Number(amount),description,date:Date.now(),account,month:new Date().getMonth()+1,year:new Date().getFullYear()},{new:true})
        res.status(200).json(expense)
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

const deleteExpense = async (req,res)=>{
    try{
        const expense = await Expense.findByIdAndDelete(req.params.id)
        if(!expense) return res.status(404).json({message:"Expense not found"})
        res.status(200).json({message:"Expense deleted."})
    }catch(error){
        return res.status(500).json({message:error.message})
    }
}

module.exports = {createExpense, updateExpense, deleteExpense, getExpense, getExpenses, getExpensesByAccount, getExpensesByMonthAndYear}