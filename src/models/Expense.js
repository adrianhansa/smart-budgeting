const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users'},
    account: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'accounts'},
    amount: {type: Number, required: true},
    description:{type: String, required: true},
    date: {type: Date, required: true},
    month: {type: String, required: true},
    year: {type: String, required: true}
})

module.exports = mongoose.model('expenses', expenseSchema)