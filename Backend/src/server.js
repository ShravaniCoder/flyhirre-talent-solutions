require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const candidateRoutes = require("./routes/candidateRoutes");
const employerRoutes = require("./routes/employerRoutes");

const app = express();

connectDB();

const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  process.env.ADMIN_URL || "http://localhost:5174",
]
  .map((origin) => origin?.trim())
  .filter(Boolean);

app.disable("x-powered-by");

app.use(
  cors({
    origin: (origin, callback) => {
      // Allows server-to-server requests and tools such as curl.
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("CORS origin not allowed")
      );
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "1mb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "1mb",
  })
);
app.use(cookieParser());

app.use(
  "/uploads",
  express.static(
    path.join(__dirname, "../uploads")
  )
);

app.get("/", (_, res) => {
  res.json({
    success: true,
    message:
      "Flyhirre Talent Solutions API is running",
  });
});

app.get("/api/health", (_, res) => {
  res.json({
    success: true,
    message: "API healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/candidates", candidateRoutes);
app.use("/api/employers", employerRoutes);

app.use((err, req, res, next) => {
  console.error("API error:", err);

  if (
    err.name === "MulterError" ||
    err.message?.includes("must be") ||
    err.message?.includes("Unexpected field")
  ) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  if (err.message === "CORS origin not allowed") {
    return res.status(403).json({
      success: false,
      message: "CORS origin not allowed.",
    });
  }

  return res.status(500).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message || "Internal server error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Flyhirre API running on port ${PORT}`
  );
});
