const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "households",
  },
  name: { type: String, trim: true, required: true },
  budget: { type: Number, required: true, default: 0.0 },
});

module.exports = mongoose.model("accounts", accountSchema);
