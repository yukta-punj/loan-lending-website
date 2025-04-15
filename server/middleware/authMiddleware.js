const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  console.log('Auth middleware called for path:', req.path);
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log('Authorization header missing or invalid format');
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];
  console.log('Token extracted from header');

  try {
    const decoded = jwt.verify(token, "loan_lending_secret_key_2024");
    console.log('Token verified, user ID:', decoded.id);
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      console.log('User not found for ID:', decoded.id);
      return res.status(401).json({ message: "User not found" });
    }

    console.log('User authenticated:', user._id);
    req.user = user; // attach user to request object
    next(); // proceed to the controller
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
