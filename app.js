const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const Event = require("./src/models/Event");

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "https://smart-budgeting.herokuapp.com"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: ["http://localhost:3000", "https://smart-budgeting.herokuapp.com"],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  socket.on("expense-created", async (data) => {
    await Event.create({
      date: new Date(),
      user: data.user.id,
      household: data.user.household._id,
      description: `${data.user.name} recorded an expense of ${data.amount} as ${data.description} purchsed on ${data.date}.`,
    });
    socket.broadcast.emit("expense-created", data);
    socket.emit("event-created");
  });
  socket.on("income-created", async (data) => {
    await Event.create({
      date: new Date(),
      user: data.user.id,
      household: data.user.household._id,
      description: `${data.user.name} recorded the income of ${data.amount} as ${data.description} earned on ${data.date}.`,
    });
    socket.broadcast.emit("income-created", data);
    socket.emit("event-created");
  });
  socket.on("expense-updated", async (data) => {
    socket.broadcast.emit("expense-updated", data);
    await Event.create({
      date: new Date(),
      user: data.user.id,
      household: data.user.household._id,
      description: `${data.user.name} updated an expense of ${data.amount} as ${data.description} purchsed on ${data.date}.`,
    });
    socket.emit("event-created");
  });
  socket.on("income-updated", async (data) => {
    socket.broadcast.emit("income-updated", data);
    await Event.create({
      date: new Date(),
      user: data.user.id,
      household: data.user.household._id,
      description: `${data.user.name} updated the income of ${data.amount} as ${data.description} earned on ${data.date}.`,
    });
    socket.emit("event-created");
  });
  socket.on("expense-deleted", async (data) => {
    socket.broadcast.emit("expense-deleted", data);
    await Event.create({
      date: new Date(),
      user: data.user.id,
      household: data.user.household._id,
      description: `${data.user.name} deleted an expense of ${data.amount} as ${data.description} spent on ${data.date}.`,
    });
    socket.emit("event-created");
  });
  socket.on("event-created", () => {
    socket.emit("event-created");
  });
  socket.on("income-deleted", async (data) => {
    socket.broadcast.emit("income-deleted", data);
    await Event.create({
      date: new Date(),
      user: data.user.id,
      household: data.user.household._id,
      description: `${data.user.name} deleted an income of ${data.amount} as ${data.description} earned on ${data.date}.`,
    });
    socket.emit("event-created");
  });
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
const eventRoutes = require("./src/routes/eventRoutes");
const savingRoutes = require("./src/routes/savingRoutes");
app.use("/", userRoutes);
app.use("/accounts", accountRoutes);
app.use("/expenses", expenseRoutes);
app.use("/income", incomeRoutes);
app.use("/events", eventRoutes);
app.use("/savings", savingRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("Connected to mongodb Atlas");
  server.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));
});
