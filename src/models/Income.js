const mongoose = require("mongoose");

const incomeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
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

module.exports = mongoose.model("incomes", incomeSchema);
