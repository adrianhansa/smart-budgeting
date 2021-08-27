const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name:{type:String, trim: true, required: true, unique: true},
    slug: {type: String, required: true, unique: true}
})

module.exports = mongoose.model('accounts',accountSchema)