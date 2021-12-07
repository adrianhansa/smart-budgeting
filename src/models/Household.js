const mongoose = require("mongoose");

const householdSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 50 },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("households", householdSchema);
