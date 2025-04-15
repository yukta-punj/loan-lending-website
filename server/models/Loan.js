const mongoose = require("mongoose");

// Schema to track individual payment records
const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  paymentDate: {
    type: Date,
    default: Date.now,
  },
});

// Main Loan schema for single borrower transactions
const loanSchema = new mongoose.Schema({
  lender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  borrower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  // Borrower details
  aadharNumber: {
    type: String,
  },
  panCardNumber: {
    type: String,
    uppercase: true,
  },
  documentImage: {
    type: String,
    default: null,
  },
  principalAmount: {
    type: Number,
  },
  interestRate: {
    type: Number,
  },
  interestType: {
    type: String,
    enum: ["simple", "compound"],
    default: "simple",
  },
  totalRepayableAmount: {
    type: Number,
  },
  amountRepaid: {
    type: Number,
    default: 0,
  },
  dueDate: {
    type: Date,
  },
  dueDateUpdated: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: ["pending", "active", "completed", "defaulted"],
    default: "pending",
  },
  payments: [paymentSchema],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Middleware to update the updatedAt field on each save
loanSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Loan = mongoose.model("Loan", loanSchema);

module.exports = Loan;
