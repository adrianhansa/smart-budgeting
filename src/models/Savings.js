const mongoose = require("mongoose");

const savingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "households",
  },
  amount: { type: Number, required: true, default: 0.0 },
  month: { type: String, required: true },
  year: { type: String, required: true },
});

module.exports = mongoose.model("savings", savingSchema);
