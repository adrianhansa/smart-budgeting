const Account = require("../models/Account");
const slugify = require("slugify");

const createAccount = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res.status(400).json({ message: "Account name is required." });
    const slug = slugify(name, { lower: true, remove: /[*+~.()'"!?:@]/g });
    const existingAccount = await Account.findOne({
      slug,
      household: req.user.household._id,
    });
    if (existingAccount)
      return res.status(400).json({
        message: "This account already exists. Please create a different one.",
      });
    const account = await Account.create({
      name,
      slug,
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
    const account = await Account.findOne({
      household: req.user.household._id,
      slug: req.params.slug,
    }).populate("household");
    if (!account)
      return res.status(404).json({ message: "Account not found." });
    res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateAccount = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ name: "Name must be provided." });
    //check if new name is different from existing one providing the initial slug
    const existingAccount = await Account.findOne({
      household: req.user.household._id,
      slug: req.params.slug,
    });
    if (existingAccount.name === name)
      return res.status(200).json({ account: existingAccount });
    const newSlug = slugify(name, { lower: true, remove: /[*+~.()'"!?:@]/g });
    //check if the new name exists in the database for this user
    const existingName = await Account.findOne({
      household: req.user.household._id,
      slug: newSlug,
    });
    if (existingName)
      return res.status(400).json({
        message: "You have already created an account with this name.",
      });
    const account = await Account.findOneAndUpdate(
      { household: req.user.household._id, slug: existingAccount.slug },
      { name, slug: newSlug },
      { new: true }
    ).populate("household");
    res.status(200).json(account);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const account = await Account.findOneAndDelete({
      household: req.user.household._id,
      slug: req.params.slug,
    });
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
