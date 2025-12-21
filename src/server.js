const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

/* =========================
   CORS (MUST BE FIRST)
   ========================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

/* =========================
   BODY PARSER
   ========================= */
app.use(express.json());

/* =========================
   DATABASE
   ========================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB error:", err));

/* =========================
   SOCKET.IO (OPTIONAL)
   ========================= */
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.set("io", io);

io.on("connection", (socket) => {
  console.log("Socket connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Socket disconnected:", socket.id);
  });
});

/* =========================
   ROUTES
   ========================= */
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/trips", require("./routes/trip.routes"));
app.use("/api/alerts", require("./routes/alert.routes"));
app.use("/api/drivers", require("./routes/driver.routes"));
app.use("/api/route", require("./routes/route.routes"));

/* =========================
   HEALTH CHECK (OPTIONAL)
   ========================= */
app.get("/", (req, res) => {
  res.send("Fleet Management API is running");
});

/* =========================
   START SERVER
   ========================= */
const PORT = process.env.PORT || 5001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
