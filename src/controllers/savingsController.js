const Saving = require("../models/Savings");

const addSaving = async (req, res) => {
  try {
    const { amount, month, year } = req.body;
    if (!amount || !month || !year)
      return res.status(400).json({ message: "All fields are required." });
    //check if there is a recorded saving for the current month and year
    const existingSaving = await Saving.findOne({
      month,
      year,
      user: req.user.id,
    });
    if (!existingSaving) {
      const saving = await Saving.create({
        amount,
        month,
        year,
        user: req.user.id,
        household: req.user.household._id,
      });
      res.status(200).json(saving);
    } else {
      //over write existing amount saved for the current month
      existingSaving.amount = req.body.amount;
      existingSaving.save();
      return res.status(200).json(existingSaving);
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSaving = async (req, res) => {
  try {
    const saving = await Saving.findOne({
      month: req.params.month,
      year: req.params.year,
      household: req.user.household._id,
    }).populate("user", "name");
    if (!saving) return res.status(404).json({ message: "Saving not found" });
    res.status(200).json(saving);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateSaving = async (req, res) => {
  try {
    const saving = await Saving.findByIdAndUpdate(
      req.params.id,
      { amount: req.body.amount },
      { new: true }
    ).populate("user", "name");
    if (!saving) return res.status(404).json({ message: "Saving not found" });
    res.status(200).json(saving);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteSaving = async (req, res) => {
  try {
    const saving = await Saving.findByIdAndDelete(req.params.id);
    if (!saving) return res.status(404).json({ message: "Saving not found" });
    res.status(200).json(saving);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getSavings = async (req, res) => {
  try {
    const savings = await Saving.find({
      household: req.user.household._id,
    }).populate("user", "name");
    if (!savings) return res.status(404).json({ message: "No savings found" });
    res.status(200).json(savings);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addSaving,
  getSavings,
  getSaving,
  deleteSaving,
  updateSaving,
};
