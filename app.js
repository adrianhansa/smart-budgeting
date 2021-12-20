const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("a user connected", socket.id);
  socket.on("expense-created", (data) =>
    socket.broadcast.emit("expense-created", data)
  );
  socket.on("income-created", (data) =>
    socket.broadcast.emit("income-created", data)
  );
  socket.on("expense-updated", (data) =>
    socket.broadcast.emit("expense-updated", data)
  );
  socket.on("income-updated", (data) =>
    socket.broadcast.emit("income-updated", data)
  );
  socket.on("expense-deleted", (data) =>
    socket.broadcast.emit("expense-deleted", data)
  );
  socket.on("income-deleted", (data) =>
    socket.broadcast.emit("income-deleted", data)
  );
});

const mongoose = require("mongoose");
require("dotenv/config");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());

const userRoutes = require("./src/routes/userRoutes");
const accountRoutes = require("./src/routes/accountRoutes");
const expenseRoutes = require("./src/routes/expenseRoutes");
const incomeRoutes = require("./src/routes/incomeRoutes");
app.use("/", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected to mongodb Atlas");
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
});
