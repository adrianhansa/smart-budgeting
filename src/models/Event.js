const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  date: { type: String, required: true },
  household: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "hoseholds",
  },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "users" },
  description: { type: String, required: true },
  read: { type: Boolean, default: false },
});

module.exports = mongoose.model("events", eventSchema);
