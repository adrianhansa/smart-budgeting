const BudgetLimit = require("../models/BudgetLimit");

const createBudgetLimit = async (req, res) => {
  try {
    const { limit, month, year, account } = req.body;

    if (!limit) {
      return res.status(400).json({
        message:
          "This limit is required and it has to contain a positive number",
      });
    }

    if (req.user.isAdmin) {
      const budgetLimit = await BudgetLimit.create({
        limit,
        household: req.user.household._id,
        account,
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
    const budgetLimit = await BudgetLimit.findById(req.params.id).populate(
      "account"
    );
    if (!budgetLimit)
      return res.status(404).json({ message: "Record not found." });
    res.status(200).json(budgetLimit);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getBudgetLimits = async (req, res) => {
  try {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    if (!month || !year) {
      return res.status(400).json({
        message:
          "Please provide the month and the year in order to get the budget limits.",
      });
    }
    const budgetLimits = await BudgetLimit.find({
      household: req.user.household._id,
      month,
      year,
    }).populate("account");
    res.status(200).json(budgetLimits);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateBudgetLimit = async (req, res) => {
  try {
    const { limit } = req.body;
    if (limit >= 0) {
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
      ).populate("account");
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
