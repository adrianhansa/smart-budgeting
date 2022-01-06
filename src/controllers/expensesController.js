const Expense = require("../models/Expense");

const createExpense = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (amount < 0)
      return res
        .status(400)
        .json({ message: "The amount spent cannot be less than zero." });
    if (!amount)
      return res.status(400).json({ message: "Amount spent is required." });
    const account = req.body.account;
    if (!account)
      return res.status(400).json({ message: "Please select an account." });
    const description = req.body.description;
    if (!description)
      return res.status(400).json({ message: "Please enter a description." });
    const date = req.body.date;
    if (!date)
      return res.status(400).json({ message: "Please select a date." });
    const expense = await Expense.create({
      user: req.user.id,
      household: req.user.household._id,
      account,
      amount,
      description,
      date,
      month: date.split("-")[1],
      year: date.split("-")[0],
    });
    res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExpense = async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id).populate(
      "account",
      "name"
    );
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ household: req.user.household._id })
      .populate("account")
      .populate("user", "name");
    res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExpensesByMonthAndYear = async (req, res) => {
  try {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    if (!month || !year)
      return res
        .status(400)
        .json({ message: "Please select both the month and the year." });
    const expenses = await Expense.find({ household: req.user.household._id })
      .where("year")
      .equals(year)
      .where("month")
      .equals(month)
      .populate("account", ["name", "budget"])
      .populate("user", "name")
      .sort({ date: "desc" });
    res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getExpensesByAccount = async (req, res) => {
  try {
    if (!req.params.account)
      return res.status(400).json({ message: "Please select the account." });
    const expenses = await Expense.find({
      household: req.user.household._id,
      account: req.params.account,
    });
    res.status(200).json(expenses);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { amount, description, date, account } = req.body;
    if (!amount || !description || !account || !date)
      return res.status(400).json({ message: "Please complete all fields." });
    if (amount < 0)
      return res
        .status(400)
        .json({ message: "The amount spent cannot be less than zero." });
    const expense = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        amount: Number(amount),
        description,
        date: date,
        account,
        month: date.split("-")[1],
        year: date.split("-")[0],
      },
      { new: true }
    );
    res.status(200).json(expense);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createExpense,
  updateExpense,
  deleteExpense,
  getExpense,
  getExpenses,
  getExpensesByAccount,
  getExpensesByMonthAndYear,
};
