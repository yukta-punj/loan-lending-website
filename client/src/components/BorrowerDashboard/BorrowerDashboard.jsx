import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Modal from "react-modal";
import CibilScoreCalculator from "../CibilScoreCalculator/CibilScoreCalculator";
import EmiCalculator from "../EmiCalculator/EmiCalculator";
import EligibilityChecker from "../EligibilityChecker/EligibilityChecker";

Modal.setAppElement("#root");

const BorrowerDashboard = () => {
  const { logout, user, token } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [myLoans, setMyLoans] = useState([]);
  const [availableLoans, setAvailableLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  // For Apply Modal
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applyLoanId, setApplyLoanId] = useState(null);
  const [aadharNumber, setAadharNumber] = useState("");
  const [panCardNumber, setPanCardNumber] = useState("");
  const [documentImage, setDocumentImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      fetchMyLoans();
      fetchAvailableLoans();
    }
  }, [user]);

  const fetchMyLoans = async () => {
    const res = await fetch(`http://localhost:5005/api/loans/my/${user._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setMyLoans(data.filter((loan) => loan.borrower?._id === user._id));
  };

  const fetchAvailableLoans = async () => {
    const res = await fetch("http://localhost:5005/api/loans/unassigned");
    const data = await res.json();
    setAvailableLoans(data);
  };

  const handleLogout = () => logout();

  const handleOpenApplyModal = (loanId) => {
    setApplyLoanId(loanId);
    setApplyModalOpen(true);
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate Aadhar Number
    if (!aadharNumber) {
      newErrors.aadharNumber = "Aadhar number is required";
    } else if (!/^\d{12}$/.test(aadharNumber)) {
      newErrors.aadharNumber = "Aadhar number must be exactly 12 digits";
    }

    // Validate PAN Card Number
    if (!panCardNumber) {
      newErrors.panCardNumber = "PAN card number is required";
    } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(panCardNumber)) {
      newErrors.panCardNumber = "PAN card number must be in the format ABCDE1234F";
    }

    // Validate Document
    if (!documentImage) {
      newErrors.documentImage = "Document is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApplySubmit = async () => {
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("loanId", applyLoanId);
    formData.append("borrowerId", user._id);
    formData.append("aadharNumber", aadharNumber);
    formData.append("panCardNumber", panCardNumber);
    formData.append("documentImage", documentImage);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5005/api/loans/apply", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        alert("Successfully applied for the loan!");
        setApplyModalOpen(false);
        setAadharNumber("");
        setPanCardNumber("");
        setDocumentImage(null);
        setErrors({});
        fetchMyLoans();
        fetchAvailableLoans();
      } else {
        alert(data.message || "Application failed");
      }
    } catch (error) {
      console.error("Loan application failed:", error);
      alert("Failed to apply for loan. Please try again.");
    }
  };

  const handlePayment = async (loanId) => {
    const amount = parseFloat(paymentAmount);
    if (isNaN(amount) || amount <= 0) return alert("Enter a valid amount.");

    const res = await fetch(
      `http://localhost:5005/api/loans/${loanId}/payments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      }
    );

    const data = await res.json();
    if (res.ok) {
      alert("Payment successful!");
      fetchMyLoans();
      setSelectedLoan(null);
      setPaymentAmount("");
    } else {
      alert(data.message || "Payment failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome, {user?.name}
        </h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b mb-6 dark:border-gray-700">
        {["overview", "loans", "apply", "cibil", "eligibility"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 mr-4 border-b-2 ${
              activeTab === tab
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab === "overview"
              ? "Overview"
              : tab === "loans"
              ? "My Loans"
              : tab === "apply"
              ? "Available Loans"
              : tab === "cibil"
              ? "CIBIL Score"
              : "Check Eligibility"}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === "overview" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Total", "Active", "Completed"].map((label, index) => {
              const count =
                index === 0
                  ? myLoans.length
                  : myLoans.filter((l) =>
                      index === 1
                        ? l.status === "active"
                        : l.status === "completed"
                    ).length;
              return (
                <div
                  key={label}
                  className={`p-4 rounded ${
                    index === 0
                      ? "bg-blue-100 dark:bg-blue-900/20"
                      : index === 1
                      ? "bg-green-100 dark:bg-green-900/20"
                      : "bg-yellow-100 dark:bg-yellow-900/20"
                  }`}
                >
                  <h3 className="font-medium">{label} Loans</h3>
                  <p className="text-2xl font-bold">{count}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* My Loans */}
      {activeTab === "loans" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            My Loans
          </h2>
          {myLoans.map((loan) => {
            const today = new Date();
            const dueDate = new Date(loan.dueDate);
            const daysLeft = Math.ceil(
              (dueDate - today) / (1000 * 60 * 60 * 24)
            );

            return (
              <div
                key={loan._id}
                className="border p-4 mb-4 rounded dark:border-gray-700"
              >
                <p className="text-gray-900 dark:text-white">
                  Principal: ₹{loan.principalAmount}, Interest:{" "}
                  {loan.interestRate}%
                </p>
                <p>Status: {loan.status}</p>
                <p>
                  Repaid: ₹{loan.amountRepaid} / ₹{loan.totalRepayableAmount}
                </p>
                <p>
                  Due: {dueDate.toLocaleDateString()}{" "}
                  {daysLeft >= 0 ? (
                    <span className="text-sm text-yellow-600">
                      ({daysLeft} day{daysLeft !== 1 ? "s" : ""} left)
                    </span>
                  ) : (
                    <span className="text-sm text-red-600">(Overdue)</span>
                  )}
                </p>

                {loan.status !== "completed" && (
                  <>
                    <button
                      onClick={() => setSelectedLoan(loan._id)}
                      className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
                    >
                      Pay
                    </button>

                    {selectedLoan === loan._id && (
                      <div className="mt-3">
                        <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                          Remaining amount to pay: ₹{loan.totalRepayableAmount - loan.amountRepaid}
                        </div>
                        <input
                          type="number"
                          placeholder="Amount to Pay"
                          value={paymentAmount}
                          onChange={(e) => {
                            const amount = parseFloat(e.target.value);
                            const remaining = loan.totalRepayableAmount - loan.amountRepaid;
                            if (amount > remaining) {
                              alert(`You cannot pay more than the remaining amount (₹${remaining})`);
                              return;
                            }
                            setPaymentAmount(e.target.value);
                          }}
                          max={loan.totalRepayableAmount - loan.amountRepaid}
                          className="p-2 border rounded dark:bg-gray-700 dark:text-white"
                        />
                        <button
                          onClick={() => handlePayment(loan._id)}
                          className="ml-2 bg-green-600 text-white px-4 py-2 rounded"
                        >
                          Confirm Payment
                        </button>
                        <button
                          onClick={() => {
                            setSelectedLoan(null);
                            setPaymentAmount("");
                          }}
                          className="ml-2 bg-gray-400 text-white px-3 py-2 rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Apply Tab with Modal */}
      {activeTab === "apply" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Available Loans to Apply
          </h2>
          {availableLoans.length === 0 ? (
            <p className="text-gray-500">No loans available</p>
          ) : (
            availableLoans.map((loan) => (
              <div
                key={loan._id}
                className="border p-4 mb-4 rounded dark:border-gray-700"
              >
                <p>Principal: ₹{loan.principalAmount}</p>
                <p>Interest Rate: {loan.interestRate}%</p>
                <p>Due Date: {new Date(loan.dueDate).toLocaleDateString()}</p>
                <button
                  onClick={() => handleOpenApplyModal(loan._id)}
                  className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
                >
                  Apply for Loan
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {/* CIBIL Score Tab */}
      {activeTab === "cibil" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            CIBIL Score Calculator
          </h2>
          <CibilScoreCalculator />
        </div>
      )}

      {/* Eligibility Checker Tab */}
      {activeTab === "eligibility" && (
        <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Check Your Loan Eligibility
          </h2>
          <EligibilityChecker />
        </div>
      )}

      {/* React Modal for Apply */}
      <Modal
        isOpen={applyModalOpen}
        onRequestClose={() => setApplyModalOpen(false)}
        className="max-w-lg mx-auto mt-24 bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl"
        overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white text-center">
          Apply for Loan
        </h2>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Aadhar Number"
              value={aadharNumber}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '').slice(0, 12);
                setAadharNumber(value);
                if (errors.aadharNumber) {
                  setErrors(prev => ({ ...prev, aadharNumber: null }));
                }
              }}
              className={`w-full px-4 py-3 border ${
                errors.aadharNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white`}
            />
            {errors.aadharNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.aadharNumber}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              placeholder="PAN Card Number"
              value={panCardNumber}
              onChange={(e) => {
                const value = e.target.value.toUpperCase().slice(0, 10);
                setPanCardNumber(value);
                if (errors.panCardNumber) {
                  setErrors(prev => ({ ...prev, panCardNumber: null }));
                }
              }}
              className={`w-full px-4 py-3 border ${
                errors.panCardNumber ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
              } rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white uppercase tracking-wider`}
            />
            {errors.panCardNumber && (
              <p className="mt-1 text-sm text-red-500">{errors.panCardNumber}</p>
            )}
          </div>

          <div>
            <div className={`bg-gray-100 dark:bg-gray-800 border ${
              errors.documentImage ? 'border-red-500' : 'border-dashed border-gray-300 dark:border-gray-600'
            } p-4 rounded-xl`}>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Upload Document (Image/PDF)
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  setDocumentImage(e.target.files[0]);
                  if (errors.documentImage) {
                    setErrors(prev => ({ ...prev, documentImage: null }));
                  }
                }}
                className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200 transition-all"
              />
            </div>
            {errors.documentImage && (
              <p className="mt-1 text-sm text-red-500">{errors.documentImage}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleApplySubmit}
            className="bg-blue-600 hover:bg-blue-700 transition text-white font-medium px-6 py-2 rounded-xl shadow"
          >
            Submit
          </button>
          <button
            onClick={() => {
              setApplyModalOpen(false);
              setAadharNumber("");
              setPanCardNumber("");
              setDocumentImage(null);
              setErrors({});
            }}
            className="bg-gray-300 hover:bg-gray-400 transition text-gray-800 font-medium px-6 py-2 rounded-xl shadow"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default BorrowerDashboard;
