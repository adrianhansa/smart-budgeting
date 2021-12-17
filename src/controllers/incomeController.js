const Income = require("../models/Income");

const createIncome = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    if (amount < 0)
      return res
        .status(400)
        .json({ message: "The amount spent cannot be less than zero." });
    if (!amount)
      return res.status(400).json({ message: "Amount spent is required." });
    const description = req.body.description;
    if (!description)
      return res.status(400).json({ message: "Please enter a description." });
    const date = req.body.date;
    if (!date)
      return res.status(400).json({ message: "Please select a date." });
    const income = await Income.create({
      user: req.user.id,
      household: req.user.household._id,
      amount,
      description,
      date,
      month: date.split("-")[1],
      year: date.split("-")[0],
    });

    res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getIncome = async (req, res) => {
  try {
    const income = await Income.findById(req.params.id);
    if (!income) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find({ household: req.user.household._id })
      .populate("account")
      .populate("user", "name");
    res.status(200).json(incomes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getIncomesByMonthAndYear = async (req, res) => {
  try {
    const month = Number(req.params.month);
    const year = Number(req.params.year);
    if (!month || !year)
      return res
        .status(400)
        .json({ message: "Please select both the month and the year." });
    const incomes = await Income.find({ household: req.user.household._id })
      .where("year")
      .equals(year)
      .where("month")
      .equals(month)
      .populate("user", "name");
    res.status(200).json(incomes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getIncomesByAccount = async (req, res) => {
  try {
    if (!req.params.account)
      return res.status(400).json({ message: "Please select the account." });
    const incomes = await Income.find({
      household: req.user.household._id,
      account: req.params.account,
    });
    res.status(200).json(incomes);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateIncome = async (req, res) => {
  try {
    const { amount, description, date, account } = req.body;
    if (!amount || !description || !date)
      return res.status(400).json({ message: "Please complete all fields." });
    if (amount < 0)
      return res
        .status(400)
        .json({ message: "The amount spent cannot be less than zero." });
    const income = await Income.findByIdAndUpdate(
      req.params.id,
      {
        amount: Number(amount),
        description,
        date: date,
        month: date.split("-")[1],
        year: date.split("-")[0],
      },
      { new: true }
    );
    res.status(200).json(income);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteIncome = async (req, res) => {
  try {
    const income = await Income.findByIdAndDelete(req.params.id);
    if (!income) return res.status(404).json({ message: "Expense not found" });
    res.status(200).json({ message: "Expense deleted." });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createIncome,
  updateIncome,
  deleteIncome,
  getIncome,
  getIncomes,
  getIncomesByAccount,
  getIncomesByMonthAndYear,
};
