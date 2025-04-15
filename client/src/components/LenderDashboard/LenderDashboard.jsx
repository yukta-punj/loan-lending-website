import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { useAuth } from "../../context/AuthContext";

Modal.setAppElement("#root");

const LenderDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [loans, setLoans] = useState([]);
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [formData, setFormData] = useState({
    mobileNumber: "",
    principalAmount: "",
    interestRate: "",
    interestType: "simple",
    totalRepayableAmount: "",
    dueDate: "",
  });

  useEffect(() => {
    if (user) {
      fetchLenderLoans();
    }
  }, [user]);

  const fetchLenderLoans = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:5005/api/loans/my/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      // Filter only the loans where the lender matches
      const lenderLoans = data.filter((loan) => loan.lender._id === user._id);
      setLoans(lenderLoans);
    } catch (error) {
      console.error("Failed to fetch loans", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleLoanInputChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const updated = { ...prev, [name]: value };

      const principal = parseFloat(updated.principalAmount);
      const rate = parseFloat(updated.interestRate);
      const type = updated.interestType;
      const dueDate = new Date(updated.dueDate);
      const today = new Date();

      const timeDiff = dueDate.getTime() - today.getTime();
      const days = Math.ceil(timeDiff / (1000 * 3600 * 24)); // total days from now until due

      if (!isNaN(principal) && !isNaN(rate) && !isNaN(days) && days > 0) {
        let total;
        if (type === "compound") {
          const dailyRate = rate / 100 / 365; // convert annual rate to daily rate
          total = principal * Math.pow(1 + dailyRate, days);
        } else {
          // Simple Interest = P + (P × R × T) / 100, where T is days/365
          total = principal + (principal * rate * (days / 365)) / 100;
        }
        updated.totalRepayableAmount = total.toFixed(2);
      } else {
        updated.totalRepayableAmount = "";
      }
      return updated;
    });
  };

  const createLoan = async () => {
    const {
      principalAmount,
      interestRate,
      interestType,
      totalRepayableAmount,
      dueDate,
    } = formData;

    if (
      !principalAmount ||
      !interestRate ||
      !totalRepayableAmount ||
      !dueDate
    ) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch("http://localhost:5005/api/loans/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          lender: user._id,
          principalAmount: parseFloat(principalAmount),
          interestRate: parseFloat(interestRate),
          interestType,
          totalRepayableAmount: parseFloat(totalRepayableAmount),
          dueDate,
          status: "pending", // Set initial status
        }),
      });

      const result = await res.json();
      if (res.ok) {
        alert("Loan Created Successfully");
        setFormData({
          mobileNumber: "",
          principalAmount: "",
          interestRate: "",
          interestType: "simple",
          totalRepayableAmount: "",
          dueDate: "",
        });
        fetchLenderLoans(); // refresh list
      } else {
        alert(result.message || "Failed to create loan. Please try again.");
      }
    } catch (error) {
      console.error("Loan creation failed", error);
      alert("Failed to create loan. Please try again.");
    }
  };

  const handleDeleteLoan = async (loanId) => {
    if (!window.confirm("Are you sure you want to delete this loan?")) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5005/api/loans/${loanId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await res.json();
      if (res.ok) {
        alert("Loan deleted successfully");
        fetchLenderLoans(); // refresh list
      } else {
        alert(result.message || "Failed to delete loan");
      }
    } catch (error) {
      console.error("Loan deletion failed", error);
      alert("Failed to delete loan. Please try again.");
    }
  };

  // Split loans into assigned (borrower exists) and unassigned (borrower is null)
  const assignedLoans = loans.filter((loan) => loan.borrower !== null);
  const unassignedLoans = loans.filter((loan) => loan.borrower === null);

  const handleUpdateLoan = async (updateData) => {
    try {
      const res = await fetch(
        `http://localhost:5005/api/loans/${selectedLoan._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );
      const updatedLoan = await res.json();
      if (res.ok) {
        alert("Loan updated successfully!");
        setSelectedLoan(updatedLoan);
        fetchLenderLoans();
      } else {
        alert(updatedLoan.message || "Update failed");
      }
    } catch (error) {
      console.error("Loan update failed", error);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(
        `http://localhost:5005/api/loans/${selectedLoan._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const result = await res.json();
      if (res.ok) {
        alert("Loan status updated successfully!");
        setShowStatusModal(false);
        fetchLenderLoans();
      } else {
        alert(result.message || "Failed to update loan status");
      }
    } catch (error) {
      console.error("Status update failed", error);
      alert("Failed to update loan status. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-5">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.name}
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            Logout
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mt-4">
          <nav className="flex space-x-8">
            {["overview", "loans", "new"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-3 text-sm font-medium border-b-2 ${
                  activeTab === tab
                    ? "border-blue-500 text-blue-600 dark:text-blue-400"
                    : "border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {tab === "overview"
                  ? "Overview"
                  : tab === "loans"
                  ? "Loans"
                  : "New Loan"}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-4 rounded">
                  <h3 className="text-blue-700 dark:text-blue-300">
                    Total Loans
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {loans.length}
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-900/30 p-4 rounded">
                  <h3 className="text-green-700 dark:text-green-300">
                    Active Loans
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {loans.filter((l) => l.status === "active").length}
                  </p>
                </div>
                <div className="bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded">
                  <h3 className="text-yellow-700 dark:text-yellow-300">
                    Pending Payments
                  </h3>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {loans.filter((l) => l.status === "pending").length}
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "loans" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Your Loans
              </h2>

              {/* Assigned Loans Section */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Assigned Loans
                </h3>
                {assignedLoans.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No assigned loans</p>
                ) : (
                  <div className="space-y-4">
                    {assignedLoans.map((loan) => (
                      <div
                        key={loan._id}
                        className="border p-4 rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Loan Details
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Principal: ₹{loan.principalAmount}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Interest Rate: {loan.interestRate}%
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Due Date: {new Date(loan.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Borrower Details
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Name: {loan.borrower.name}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Email: {loan.borrower.email}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Status: <span className={`font-semibold ${
                                loan.status === 'active' ? 'text-green-600' :
                                loan.status === 'pending' ? 'text-yellow-600' :
                                'text-red-600'
                              }`}>{loan.status}</span>
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 pt-4 border-t dark:border-gray-700">
                          <p className="text-gray-600 dark:text-gray-300">
                            Amount Repaid: ₹{loan.amountRepaid} / ₹{loan.totalRepayableAmount}
                          </p>
                          <div className="flex justify-end space-x-2 mt-2">
                            <button
                              onClick={() => {
                                setSelectedLoan(loan);
                                setShowDetailsModal(true);
                              }}
                              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                              View Details
                            </button>
                            {(loan.status === 'active' || loan.status === 'pending') && (
                              <button
                                onClick={() => {
                                  setSelectedLoan(loan);
                                  setShowStatusModal(true);
                                }}
                                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                              >
                                Update Status
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Unassigned Loans Section */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Unassigned Loans
                </h3>
                {unassignedLoans.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400">No unassigned loans</p>
                ) : (
                  <div className="space-y-4">
                    {unassignedLoans.map((loan) => (
                      <div
                        key={loan._id}
                        className="border p-4 rounded-lg dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                              Loan Details
                            </h4>
                            <p className="text-gray-600 dark:text-gray-300">
                              Principal: ₹{loan.principalAmount}
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Interest Rate: {loan.interestRate}%
                            </p>
                            <p className="text-gray-600 dark:text-gray-300">
                              Due Date: {new Date(loan.dueDate).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="inline-block px-3 py-1 text-sm font-semibold text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900/30 dark:text-yellow-300">
                              Unassigned
                            </span>
                            <button
                              onClick={() => handleDeleteLoan(loan._id)}
                              className="mt-2 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                            >
                              Delete Loan
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Loan Details Modal */}
          <Modal
            isOpen={showDetailsModal}
            onRequestClose={() => {
              setShowDetailsModal(false);
              setSelectedLoan(null);
            }}
            contentLabel="Loan Details"
            className="max-w-2xl mx-auto mt-20 bg-white p-6 rounded shadow dark:bg-gray-800"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
          >
            {selectedLoan && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Complete Loan Details
                </h2>
                <div className="text-sm space-y-2 text-gray-700 dark:text-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-semibold mb-2">Loan Information</h3>
                      <p><strong>Principal:</strong> ₹{selectedLoan.principalAmount}</p>
                      <p><strong>Interest Rate:</strong> {selectedLoan.interestRate}% ({selectedLoan.interestType})</p>
                      <p><strong>Total Repayable:</strong> ₹{selectedLoan.totalRepayableAmount}</p>
                      <p><strong>Amount Repaid:</strong> ₹{selectedLoan.amountRepaid}</p>
                      <p><strong>Due Date:</strong> {new Date(selectedLoan.dueDate).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> <span className={`font-semibold ${
                        selectedLoan.status === 'active' ? 'text-green-600' :
                        selectedLoan.status === 'pending' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>{selectedLoan.status}</span></p>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Borrower Information</h3>
                      <p><strong>Name:</strong> {selectedLoan.borrower.name}</p>
                      <p><strong>Email:</strong> {selectedLoan.borrower.email}</p>
                      <p><strong>Aadhar:</strong> {selectedLoan.aadharNumber}</p>
                      <p><strong>PAN:</strong> {selectedLoan.panCardNumber}</p>
                      {selectedLoan.documentImage && (
                        <p>
                          <strong>Document:</strong>{" "}
                          <a
                            href={`http://localhost:5005${selectedLoan.documentImage}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 underline"
                          >
                            View File
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h3 className="font-semibold mb-2">Payment History</h3>
                    {selectedLoan.payments && selectedLoan.payments.length > 0 ? (
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                          <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Amount</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {selectedLoan.payments.map((payment, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  {new Date(payment.paymentDate).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
                                  ₹{payment.amount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">No payments recorded yet.</p>
                    )}
                  </div>
                </div>
                <div className="mt-6 text-right">
                  <button
                    onClick={() => {
                      setShowDetailsModal(false);
                      setSelectedLoan(null);
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                  >
                    Close
                  </button>
                </div>
              </>
            )}
          </Modal>

          {/* Status Update Modal */}
          <Modal
            isOpen={showStatusModal}
            onRequestClose={() => {
              setShowStatusModal(false);
              setSelectedLoan(null);
            }}
            contentLabel="Update Loan Status"
            className="max-w-md mx-auto mt-20 bg-white p-6 rounded shadow dark:bg-gray-800"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50"
          >
            {selectedLoan && (
              <>
                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
                  Update Loan Status
                </h2>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Current Status: <span className="font-semibold">{selectedLoan.status}</span>
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => handleStatusUpdate('active')}
                    className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Mark as Active
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('completed')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Mark as Completed
                  </button>
                  <button
                    onClick={() => handleStatusUpdate('defaulted')}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Mark as Defaulted
                  </button>
                </div>
                <button
                  onClick={() => {
                    setShowStatusModal(false);
                    setSelectedLoan(null);
                  }}
                  className="mt-4 w-full bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </>
            )}
          </Modal>

          {activeTab === "new" && (
            <div className="bg-white dark:bg-gray-800 p-6 rounded shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                Create New Loan
              </h2>
              <div className="grid gap-4">
                <input
                  name="principalAmount"
                  type="number"
                  placeholder="Principal Amount"
                  value={formData.principalAmount}
                  required
                  onChange={handleLoanInputChange}
                  className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                />
                <input
                  name="interestRate"
                  type="number"
                  placeholder="Interest Rate (%)"
                  value={formData.interestRate}
                  onChange={handleLoanInputChange}
                  required
                  className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                />
                <select
                  name="interestType"
                  value={formData.interestType}
                  onChange={handleLoanInputChange}
                  required
                  className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                >
                  <option value="simple">Simple</option>
                  <option value="compound">Compound</option>
                </select>
                <input
                  name="dueDate"
                  type="date"
                  placeholder="Due Date"
                  value={formData.dueDate}
                  onChange={handleLoanInputChange}
                  required
                  className="p-2 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
                />
                <input
                  name="totalRepayableAmount"
                  type="text"
                  placeholder="Total Repayable Amount"
                  value={formData.totalRepayableAmount}
                  disabled
                  className="p-2 rounded border border-gray-300 bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300 cursor-not-allowed"
                />
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  The total repayable amount is calculated automatically based
                  on your loan amount, interest rate, and the number of days
                  until your due date. For compound interest, the daily interest
                  is added to your principal every day.
                </span>
                <button
                  onClick={createLoan}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Submit Loan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LenderDashboard;
