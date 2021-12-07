const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "households",
  },
  name: { type: String, trim: true, required: true },
  slug: { type: String, required: true },
});

module.exports = mongoose.model("accounts", accountSchema);
