const BudgetLimit = require("../models/BudgetLimit");
const Account = require("../models/Account");
const validator = require("validator");

const createBudgetLimit = async (req, res) => {
  try {
    const account = await Account.findOne({
      household: req.user.household._id,
      slug: req.params.account,
    });
    if (!account)
      return res.status(404).json({ message: "Account not found." });
    const { limit, month, year } = req.body;
    if (!limit || !validator.isNumeric(limit)) {
      return res.status(400).json({
        message:
          "This limit is required and it has to contain a positive number",
      });
    }
    if (req.user.isAdmin) {
      const budgetLimit = await BudgetLimit.create({
        limit,
        household: req.user.household._id,
        account: account._id,
        month,
        year,
      });
      if (!budgetLimit)
        return res.status(400).json({
          message: "Budget limit for this account could not be created.",
        });
      res.status(200).json(budgetLimit);
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to set a budget limit." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBudgetLimit = async (req, res) => {
  try {
    const budgetLimit = await BudgetLimit.findById(req.params.id);
    if (!budgetLimit)
      return res.status(404).json({ message: "Record not found." });
    res.status(200).json(budgetLimit);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBudgetLimits = async (req, res) => {
  try {
    const budgetLimits = await BudgetLimit.find({
      household: req.user.houshold._id,
    });
    res.status(200).json(budgetLimits);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBudgetLimit = async (req, res) => {
  try {
    const { limit } = req.body;
    if (!validator.isNumeric(limit) || limit >= 0) {
      return res.status(400).json({
        message:
          "The budget amount has to be a number equal or greater than 0.",
      });
    }
    if (req.user.isAdmin) {
      const budgetLimit = await BudgetLimit.findByIdAndUpdate(
        req.params.id,
        { limit },
        { new: true }
      );
      res.status(200).json(budgetLimit);
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to set a budget limit." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteBudgetLimit = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const budgetLimit = await BudgetLimit.findByIdAndDelete(req.params.id);
      if (!budgetLimit)
        return res.status(404).json({ message: "Record not found." });
      res
        .status(200)
        .json({ message: "Budget limit for this account has been removed." });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to set a budget limit." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createBudgetLimit,
  updateBudgetLimit,
  getBudgetLimit,
  deleteBudgetLimit,
  getBudgetLimits,
};
