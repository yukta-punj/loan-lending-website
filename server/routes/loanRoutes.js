const express = require("express");
const multer = require("multer");
const path = require("path");
const Loan = require("../models/Loan");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Get loans for the authenticated user (as borrower or lender)
router.get("/my/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const loans = await Loan.find({
      $or: [{ borrower: userId }, { lender: userId }],
    }).populate("borrower lender"); // payments are already embedded

    res.json(loans); // payments included by default
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all unassigned loans (borrower is null or undefined)
router.get("/unassigned", async (req, res) => {
  try {
    const unassignedLoans = await Loan.find({
      borrower: { $in: [null, undefined] },
    }).populate("lender");

    res.json(unassignedLoans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Create a new loan without image upload
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const newLoan = new Loan({
      ...req.body, // All fields from req.body, without documentImage
    });

    await newLoan.save();
    res.status(201).json(newLoan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Apply for a loan with image upload
router.post("/apply", upload.single("documentImage"), async (req, res) => {
  try {
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const updatedLoan = await Loan.findByIdAndUpdate(
      req.body.loanId,
      {
        borrower: req.body.borrowerId,
        documentImage: imageUrl,
        status: "active",
      },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    res.status(200).json(updatedLoan);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// Read all loans
router.get("/", async (req, res) => {
  try {
    const loans = await Loan.find().populate("borrower lender");
    res.json(loans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read single loan
router.get("/:id", async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate("borrower lender");
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update loan
router.put("/:id", upload.single("documentImage"), async (req, res) => {
  try {
    const updatedData = req.body;
    if (req.file) {
      updatedData.documentImage = `/uploads/${req.file.filename}`;
    }

    const loan = await Loan.findByIdAndUpdate(req.params.id, updatedData, {
      new: true,
    });
    if (!loan) return res.status(404).json({ message: "Loan not found" });
    res.json(loan);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete loan
router.delete("/:id", async (req, res) => {
  try {
    const deletedLoan = await Loan.findByIdAndDelete(req.params.id);
    if (!deletedLoan)
      return res.status(404).json({ message: "Loan not found" });
    res.json({ message: "Loan deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a payment to a loan
router.post("/:loanId/payments", async (req, res) => {
  try {
    const { amount } = req.body;
    const { loanId } = req.params;

    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Add payment to array
    loan.payments.push({
      amount,
      paymentDate: new Date(),
    });

    // Update amount repaid
    loan.amountRepaid += amount;

    // Update status if needed
    if (loan.amountRepaid >= loan.totalRepayableAmount) {
      loan.status = "completed";
    }

    await loan.save();
    res.json({ message: "Payment added successfully", loan });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
