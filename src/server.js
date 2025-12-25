const express = require("express");
const http = require("http");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

/* =========================
   CORS (PATCH FIXED)
   ========================= */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://fleet-frontend-8se3.vercel.app"
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

// Handle CORS preflight by invoking the cors middleware for OPTIONS requests
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return cors(corsOptions)(req, res, next);
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
  .catch((err) => console.error("Mongo error:", err));

/* =========================
   ROUTES
   ========================= */
app.use("/api/vehicles", require("./routes/vehicleRoutes"));
app.use("/api/drivers", require("./routes/driver.routes"));
app.use("/api/trips", require("./routes/trip.routes"));
app.use("/api/alerts", require("./routes/alert.routes"));
app.use("/api/auth", require("./routes/authRoutes"));

/* =========================
   START SERVER
   ========================= */
const PORT = process.env.PORT || 5001;
server.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
