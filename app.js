const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5000/"],
    credentials: true,
  })
);

const userRoutes = require("./src/routes/userRoutes");
app.use("/", userRoutes);

const accountRoutes = require("./src/routes/accountRoutes");
app.use("/accounts", accountRoutes);

const expenseRoutes = require("./src/routes/expenseRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
app.use("/expenses", expenseRoutes);
app.use("/", incomeRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected to mongodb Atlas");
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
});
