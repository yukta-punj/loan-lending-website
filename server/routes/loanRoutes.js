const express = require("express");
const multer = require("multer");
const path = require("path");
const Loan = require("../models/Loan");
const authMiddleware = require("../middleware/authMiddleware");
const Alert = require("../models/Alert");
const fs = require("fs");
const User = require("../models/User");

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

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/";
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage });

// Helper function to create alerts
const createAlert = async (userId, loanId, type, message) => {
  try {
    const alert = new Alert({
      user: userId,
      loan: loanId,
      type,
      message,
    });
    await alert.save();
    console.log('Alert created:', { userId, loanId, type, message }); // Debug log
  } catch (error) {
    console.error('Error creating alert:', error);
  }
};

// Create a new loan with image upload
router.post("/create-with-image", authMiddleware, upload.single("documentImage"), async (req, res) => {
  try {
    const loanData = {
      ...req.body,
      lender: req.user.id,
      documentImage: req.file ? req.file.path : null,
    };

    const loan = new Loan(loanData);
    await loan.save();

    // Create alert for lender
    await createAlert(
      req.user.id,
      loan._id,
      'loan_created',
      `You have created a new loan of ₹${loan.principalAmount}`
    );

    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan with image:', error);
    res.status(500).json({ message: "Error creating loan" });
  }
});

// Create a new loan without image upload
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const loan = new Loan({
      ...req.body,
      lender: req.user.id,
    });
    await loan.save();

    // Create alert for lender
    await createAlert(
      req.user.id,
      loan._id,
      'loan_created',
      `You have created a new loan of ₹${loan.principalAmount}`
    );

    // Create alerts for all borrowers
    const borrowers = await User.find({ role: 'borrower' });
    for (const borrower of borrowers) {
      await createAlert(
        borrower._id,
        loan._id,
        'loan_created',
        `A new loan of ₹${loan.principalAmount} is available for application`
      );
    }

    res.status(201).json(loan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ message: "Error creating loan" });
  }
});

// Update loan status
router.patch("/:id/status", authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const oldStatus = loan.status;
    loan.status = req.body.status;
    await loan.save();

    // Create alerts for both lender and borrower
    const statusMessage = {
      active: "Loan has been activated",
      completed: "Loan has been marked as completed",
      defaulted: "Loan has been marked as defaulted",
    };

    if (statusMessage[req.body.status]) {
      await createAlert(
        loan.lender,
        loan._id,
        'loan_updated',
        statusMessage[req.body.status]
      );
      
      if (loan.borrower) {
        await createAlert(
          loan.borrower,
          loan._id,
          'loan_updated',
          statusMessage[req.body.status]
        );
      }
    }

    res.json(loan);
  } catch (error) {
    console.error('Error updating loan status:', error);
    res.status(500).json({ message: "Error updating loan status" });
  }
});

// Record a payment
router.post("/:id/payment", authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    const payment = {
      amount: req.body.amount,
      paymentDate: new Date(),
    };

    // Check if payment would exceed the total repayable amount
    if (loan.amountRepaid + payment.amount > loan.totalRepayableAmount) {
      return res.status(400).json({ 
        message: `Payment would exceed the total loan amount. Maximum remaining payment: ₹${loan.totalRepayableAmount - loan.amountRepaid}` 
      });
    }

    loan.payments.push(payment);
    loan.amountRepaid += payment.amount;
    await loan.save();

    // Create alerts for both lender and borrower
    await createAlert(
      loan.lender,
      loan._id,
      'payment_received',
      `Payment of ₹${payment.amount} received for loan`
    );

    if (loan.borrower) {
      await createAlert(
        loan.borrower,
        loan._id,
        'payment_received',
        `Your payment of ₹${payment.amount} has been recorded`
      );
    }

    res.json(loan);
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({ message: "Error recording payment" });
  }
});

// Get all loans for a user (as lender or borrower)
router.get("/user/:userId", authMiddleware, async (req, res) => {
  try {
    const loans = await Loan.find({
      $or: [{ lender: req.params.userId }, { borrower: req.params.userId }],
    }).populate("lender borrower", "name email");
    res.json(loans);
  } catch (error) {
    console.error('Error fetching user loans:', error);
    res.status(500).json({ message: "Error fetching loans" });
  }
});

// Get a single loan by ID
router.get("/:id", authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id).populate(
      "lender borrower",
      "name email"
    );
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    res.json(loan);
  } catch (error) {
    console.error('Error fetching loan:', error);
    res.status(500).json({ message: "Error fetching loan" });
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
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const loan = await Loan.findById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }

    // Check if the user is the lender
    if (loan.lender.toString() !== req.user.id) {
      return res.status(403).json({ message: "Only the lender can delete this loan" });
    }

    // Check if the loan has a borrower
    if (loan.borrower) {
      return res.status(400).json({ message: "Cannot delete a loan that has been assigned to a borrower" });
    }

    await Loan.findByIdAndDelete(req.params.id);
    res.json({ message: "Loan deleted successfully" });
  } catch (err) {
    console.error('Error deleting loan:', err);
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

    // Check if payment would exceed the total repayable amount
    if (loan.amountRepaid + amount > loan.totalRepayableAmount) {
      return res.status(400).json({ 
        message: `Payment would exceed the total loan amount. Maximum remaining payment: ₹${loan.totalRepayableAmount - loan.amountRepaid}` 
      });
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

    // Create alerts for both lender and borrower
    await createAlert(
      loan.lender,
      loan._id,
      'payment_received',
      `Payment of ₹${amount} received for loan`
    );

    if (loan.borrower) {
      await createAlert(
        loan.borrower,
        loan._id,
        'payment_received',
        `Your payment of ₹${amount} has been recorded`
      );
    }

    res.json({ message: "Payment added successfully", loan });
  } catch (err) {
    console.error('Error adding payment:', err);
    res.status(500).json({ error: err.message });
  }
});

// Apply for a loan
router.post("/apply", authMiddleware, upload.single("documentImage"), async (req, res) => {
  try {
    const { loanId, borrowerId, aadharNumber, panCardNumber } = req.body;

    // Validate Aadhar Number (12 digits)
    if (!aadharNumber || !/^\d{12}$/.test(aadharNumber)) {
      return res.status(400).json({ message: "Aadhar number must be exactly 12 digits" });
    }

    // Validate PAN Card Number (ABCDE1234F format)
    if (!panCardNumber || !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNumber)) {
      return res.status(400).json({ 
        message: "PAN card number must be in the format ABCDE1234F (5 letters, 4 numbers, 1 letter)" 
      });
    }

    // Check if loan exists and is unassigned
    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found" });
    }
    if (loan.borrower) {
      return res.status(400).json({ message: "Loan is already assigned to a borrower" });
    }

    // Update loan with borrower details
    loan.borrower = borrowerId;
    loan.aadharNumber = aadharNumber;
    loan.panCardNumber = panCardNumber;
    loan.documentImage = req.file ? req.file.path : null;
    loan.status = "pending";
    await loan.save();

    // Create alerts for both lender and borrower
    await createAlert(
      loan.lender,
      loan._id,
      'loan_applied',
      `A borrower has applied for your loan of ₹${loan.principalAmount}`
    );

    await createAlert(
      borrowerId,
      loan._id,
      'loan_applied',
      `You have successfully applied for the loan of ₹${loan.principalAmount}`
    );

    res.json({ message: "Loan application submitted successfully", loan });
  } catch (error) {
    console.error('Error applying for loan:', error);
    res.status(500).json({ message: "Error applying for loan" });
  }
});

module.exports = router;
