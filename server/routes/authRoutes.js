const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

// Register route
router.post("/register", register);

// Login route
router.post("/login", login);

// Auth check route (protected)
router.get("/me", authMiddleware, (req, res) => {
  res.json({
    message: "User is authenticated",
    user: req.user,
  });
});

module.exports = router;
