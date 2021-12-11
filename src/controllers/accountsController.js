const Account = require("../models/Account");

const createAccount = async (req, res) => {
  try {
    const name = req.body.name;
    let budget;
    if (!req.body.budget) {
      budget = 0.0;
    } else {
      budget = Number(req.body.budget);
      if (budget < 0)
        return res
          .status(400)
          .json({ message: "The budget limit cannot be less than zero." });
    }
    if (!name)
      return res
        .status(400)
        .json({ message: "The name of your new account is required." });
    const existingAccount = await Account.findOne({
      name,
      household: req.user.household._id,
    });
    if (existingAccount)
      return res.status(400).json({
        message: "This account already exists. Please create a different one.",
      });
    const account = await Account.create({
      name,
      budget,
      household: req.user.household._id,
    });
    res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAccounts = async (req, res) => {
  try {
    const accounts = await Account.find({
      household: req.user.household._id,
    }).populate("household");
    res.status(200).json(accounts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAccount = async (req, res) => {
  try {
    const account = await Account.findById(req.params.id).populate("household");
    if (!account)
      return res.status(404).json({ message: "Account not found." });
    res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const name = req.body.name;
    let budget;
    if (!req.body.budget) {
      budget = 0.0;
    } else {
      budget = Number(req.body.budget);
      if (budget < 0)
        return res
          .status(400)
          .json({ message: "The budget limit cannot be less than zero." });
    }
    if (!name)
      return res
        .status(400)
        .json({ message: "Please provide a name for this account." });
    const account = await Account.findByIdAndUpdate(
      req.params.id,
      { name, budget },
      { new: true }
    ).populate("household");
    res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findByIdAndDelete(req.params.id);
    if (!account)
      return res.status(404).json({ message: "Account not found." });
    res.status(200).json({ message: "Account deleted successfully." });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createAccount,
  getAccounts,
  getAccount,
  updateAccount,
  deleteAccount,
};
