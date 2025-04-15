const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const loanRoutes = require("./routes/loanRoutes");
const alertRoutes = require("./routes/alerts");

const fs = require("fs");
const uploadPath = path.join(__dirname, "uploads");

if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Load environment variables from the .env file in the project root
require("dotenv").config({ path: path.join(process.cwd(), ".env") });

const app = express();

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

app.use(cors(corsOptions));
app.options(corsOptions.origin, cors(corsOptions));

// Middleware for parsing JSON bodies
app.use(express.json());
// Middleware for parsing URL-encoded bodies (e.g., form submissions)
app.use(express.urlencoded({ extended: true }));
// Middleware for parsing cookies
app.use(cookieParser());

// Serve static files for uploads (if needed)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/alerts", alertRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error details:", {
    message: err.message,
    stack: err.stack,
    path: req.path,
    method: req.method,
    body: req.body,
  });

  res.status(500).json({
    message: "Something went wrong!",
    error: err.message,
    details: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
});

const PORT = process.env.PORT || 5005;

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start the server
    await app.listen(PORT);
    console.log(`Server running on port ${PORT}`);
  } catch (error) {
    if (error.code === "EADDRINUSE") {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
      await app.listen(PORT + 1);
      console.log(`Server running on port ${PORT + 1}`);
    } else {
      console.error("Error starting server:", error);
      process.exit(1);
    }
  }
};

startServer();
