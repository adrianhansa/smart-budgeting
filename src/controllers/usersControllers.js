const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendToken = require("../utils/sendToken");

const register = async (req, res) => {
  try {
    const { household, name, email, password, passwordVerify } = req.body;
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
      household,
      name,
      email,
      password,
    });
    sendToken(user, 200, res);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Both fields are required." });
    const user = await User.findOne({ email });
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

const deleteAccount = async (req, res) => {
  try {
    //
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login, deleteAccount, logout };
