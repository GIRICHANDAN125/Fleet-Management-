const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

/* =========================
   CORS (RENDER SAFE)
   ========================= */
const allowedOrigins = [
  "http://localhost:5173",
  "https://fleet-frontend-3f3g.vercel.app",
  "https://fleet-frontend-r8xl5mow1-girichandan125s-projects.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// ✅ SAFE PREFLIGHT HANDLING (NO CRASH ON RENDER)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

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
  .catch((err) => {
    console.error("MongoDB error:", err);
    process.exit(1);
  });

/* =========================
   SOCKET.IO
   ========================= */
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
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
   HEALTH CHECK
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
