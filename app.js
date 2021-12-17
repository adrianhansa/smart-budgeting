const express = require("express");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");

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
app.use("/income", incomeRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected to mongodb Atlas");
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
});

io.on("connect", (socket) => {
  console.log(socket.id);
});
