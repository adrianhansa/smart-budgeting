const mongoose = require("mongoose");

const budgetLimitSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "accounts",
  },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "household",
  },
  month: { type: String, required: true },
  year: { type: String },
  limit: { type: Number, required: true, default: 0.0 },
});

module.exports = mongoose.model("budget-limits", budgetLimitSchema);
