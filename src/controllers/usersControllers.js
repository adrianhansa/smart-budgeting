const User = require("../models/User");
const Household = require("../models/Household");
const sendToken = require("../utils/sendToken");

const register = async (req, res) => {
  try {
    const { household, name, email, password, passwordVerify } = req.body;
    if (!name || !email || !password || !household)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "The password must contain at least 6 characters." });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ message: "The two passwords do not match" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "This email has already been registered. Please login.",
      });
    const user = await User.create({
      name,
      email,
      isAdmin: true,
      password,
    });
    const householdCreated = await Household.create({
      owner: user._id,
      name: household,
    });
    const updatedUser = await User.findByIdAndUpdate(
      user._id,
      { household: householdCreated._id },
      { new: true }
    ).populate("household");
    sendToken(updatedUser, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const addUser = async (req, res) => {
  try {
    const { name, email, password, passwordVerify } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "The password must contain at least 6 characters." });
    if (password !== passwordVerify)
      return res
        .status(400)
        .json({ message: "The two passwords do not match" });
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({
        message: "This email has already been registered. Please login.",
      });
    const user = await User.create({
      name,
      email,
      isAdmin: false,
      password,
      household: req.user.household,
    });
    //send activation email
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getUsers = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.find({ household: req.user.household._id });
      res.status(200).json({ users });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform his operation." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    //delete self account
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Both fields are required." });
    const user = await User.findOne({ email }).populate("household");
    if (!user)
      return res.status(404).json({ message: "This user does not exist" });
    if (user && (await user.matchPassword(password))) {
      sendToken(user, 200, res);
    } else {
      return res.status(401).json({ message: "Invalid email/password." });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.status(200).clearCookie("token").send();
};

const resetPassword = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      const user = await User.findOne({
        household: req.user.household._id,
        _id: req.params.id,
      });
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }
      const userDeleted = await User.findByIdAndDelete(user._id);
      res.status(200).json(userDeleted);
    } else {
      return res.status(403).json({
        message: "You are not authorized to perform this operation.",
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const toggleAdmin = async (req, res) => {
  if (req.user.isAdmin) {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { isAdmin: req.body.isAdmin },
      { new: true }
    );
    res.status(200).json(updatedUser);
    try {
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  } else {
    return res
      .status(401)
      .json({ message: "You are not authorized to perform this change." });
  }
};

module.exports = {
  register,
  login,
  deleteAccount,
  logout,
  addUser,
  deleteUser,
  getUsers,
  toggleAdmin,
};
