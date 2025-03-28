const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, "loan_lending_secret_key_2024", {
    expiresIn: "30d",
  });
};

// Register User
exports.register = async (req, res) => {
  try {
    console.log("Registration request received:", {
      ...req.body,
      password: req.body.password ? "[HIDDEN]" : undefined,
    });
    const { name, email, phone, password, role } = req.body;

    // Validate required fields
    if (!name) {
      console.log("Name is missing");
      return res.status(400).json({ message: "Name is required" });
    }
    if (!email && !phone) {
      console.log("Both email and phone are missing");
      return res
        .status(400)
        .json({ message: "Either email or phone is required" });
    }
    if (!password) {
      console.log("Password is missing");
      return res.status(400).json({ message: "Password is required" });
    }
    if (!role) {
      console.log("Role is missing");
      return res.status(400).json({ message: "Role is required" });
    }
    if (!["lender", "borrower"].includes(role)) {
      console.log("Invalid role:", role);
      return res
        .status(400)
        .json({ message: 'Role must be either "lender" or "borrower"' });
    }

    // Check if user already exists with either email or phone
    console.log("Checking for existing user with:", { email, phone });

    // Check email separately
    if (email) {
      const existingEmail = await User.findOne({ email });
      if (existingEmail) {
        console.log("Found existing user with email:", {
          id: existingEmail._id,
          name: existingEmail.name,
          email: existingEmail.email,
          phone: existingEmail.phone,
        });
        return res.status(400).json({
          message: "User already exists with this email address",
        });
      }
    }

    // Check phone separately
    if (phone) {
      const existingPhone = await User.findOne({ phone });
      if (existingPhone) {
        console.log("Found existing user with phone:", {
          id: existingPhone._id,
          name: existingPhone.name,
          email: existingPhone.email,
          phone: existingPhone.phone,
        });
        return res.status(400).json({
          message: "User already exists with this phone number",
        });
      }
    }

    // Create new user
    console.log("Creating new user with:", {
      name,
      email,
      phone,
      role,
      hasPassword: !!password,
    });

    const user = new User({
      name,
      email: email || undefined,
      phone: phone || undefined,
      role,
      password,
    });

    // Log user object before save (without sensitive data)
    console.log("User object before save:", {
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      hasPassword: !!user.password,
    });

    // Validate the user model before saving
    console.log("Validating user model");
    const validationError = user.validateSync();
    if (validationError) {
      console.log("Validation error:", validationError);
      return res.status(400).json({
        message: "Invalid user data",
        errors: Object.values(validationError.errors).map((err) => err.message),
      });
    }

    // Save user to database
    console.log("Saving user to database");
    try {
      await user.save();
      console.log("User saved successfully:", {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        hasPassword: !!user.password,
      });
    } catch (saveError) {
      console.error("Error saving user to database:", saveError);
      if (saveError.code === 11000) {
        // Check which field caused the duplicate error
        const field = Object.keys(saveError.keyPattern)[0];
        return res.status(400).json({
          message: `User already exists with this ${field}`,
        });
      }
      throw saveError;
    }

    // Generate token
    const token = generateToken(user._id);
    console.log("Token generated successfully");

    res.status(201).json({
      message: "Registration successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        token: token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
      details: error.stack,
    });
  }
};

// Login User
exports.login = async (req, res) => {
  try {
    console.log("Login attempt received:", { email: req.body.email });
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      console.log("Missing credentials:", {
        hasEmail: !!email,
        hasPassword: !!password,
      });
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    // Find user by email
    console.log("Looking up user with email:", email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log("No user found with email:", email);
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check password
    console.log("Verifying password for user:", {
      userId: user._id,
      email: user.email,
    });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Invalid password for user:", {
        userId: user._id,
        email: user.email,
      });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    console.log("Generating token for user:", {
      userId: user._id,
      role: user.role,
    });
    const token = jwt.sign(
      { id: user._id, role: user.role },
      "loan_lending_secret_key_2024",
      { expiresIn: "30d" }
    );

    // Send response
    console.log("Login successful for user:", {
      userId: user._id,
      email: user.email,
    });
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login error:", {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    res.status(500).json({
      message: "Server error during login",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};
