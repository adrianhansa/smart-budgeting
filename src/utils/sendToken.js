const jwt = require("jsonwebtoken");

const sendToken = (user, statusCode, res) => {
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      household: user.household,
    },
    process.env.JWT_SECRET
  );
  res.status(statusCode).cookie("token", token, { httpOnly: true }).json({
    name: user.name,
    isAdmin: user.isAdmin,
    email: user.email,
    household: user.household,
  });
};

module.exports = sendToken;
