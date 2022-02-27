const express = require("express");
const app = express();
const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:3000", "https://smart-budgeting.netlify.app"],
    credentials: true,
  })
);

const mongoose = require("mongoose");
require("dotenv/config");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
const accountRoutes = require("./src/routes/accountRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
const savingRoutes = require("./src/routes/savingRoutes");
app.use("/", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/savings", savingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected to mongodb Atlas");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
});
