const mongoose = require('mongoose')

const budgetLimitSchema = new mongoose.Schema({
    account: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'accounts'},
    user: {type: mongoose.Schema.Types.ObjectId, requred: true, ref: 'users'},
    month: {type: String, required: true},
    year: {type: String},
    limit: {type: Number, required: true, default: 0.00}
})

module.exports = mongoose.model('budget-limits',budgetLimitSchema)