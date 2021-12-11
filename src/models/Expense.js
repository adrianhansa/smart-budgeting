const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "accounts",
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "households",
  },
  amount: { type: Number, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  month: { type: Number, required: true },
  year: { type: Number, required: true },
});

module.exports = mongoose.model("expenses", expenseSchema);
