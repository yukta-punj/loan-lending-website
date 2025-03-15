import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaMoneyCheckAlt, FaUser, FaSignOutAlt, FaChartLine, FaSave, FaCamera, FaUpload, FaTimes, FaPlusCircle, FaCheckCircle, FaClock, FaTimesCircle, FaFileUpload } from "react-icons/fa";
import { useAuth } from "../../context/AuthContext";
import CibilScore from "../CibilScore/CibilScore";
import LoanApplication from "../LoanApplication/LoanApplication";
import PaymentRescheduler from "../Payment/PaymentRescheduler";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [loans, setLoans] = useState([]);
  const [newLoan, setNewLoan] = useState({ amount: "", purpose: "", status: "Pending" });

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const applyForLoan = () => {
    if (newLoan.amount && newLoan.purpose) {
      setLoans([...loans, { id: loans.length + 1, ...newLoan }]);
      setNewLoan({ amount: "", purpose: "", status: "Pending" });
      alert("Loan Application Submitted!");
    } else {
      alert("Please fill in all loan details.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="px-4 py-5 sm:px-0 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome, {user?.name || "User"}
          </h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
          >
            Logout
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="mt-6 border-b border-gray-200 dark:border-gray-700">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("overview")}
              className={`${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("payments")}
              className={`${
                activeTab === "payments"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Payments
            </button>
            <button
              onClick={() => setActiveTab("profile")}
              className={`${
                activeTab === "profile"
                  ? "border-blue-500 text-blue-600 dark:text-blue-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Profile
            </button>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "overview" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Dashboard Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-blue-700 dark:text-blue-300">
                    Total Loans
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    3
                  </p>
                </div>
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-green-700 dark:text-green-300">
                    Active Loans
                  </h3>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    2
                  </p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-yellow-700 dark:text-yellow-300">
                    Pending Payments
                  </h3>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    1
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "payments" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Payment Management
              </h2>
              <PaymentRescheduler />
            </div>
          )}

          {activeTab === "profile" && (
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Profile Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Name
                  </label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {user?.name || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {user?.email || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Phone
                  </label>
                  <p className="mt-1 text-lg text-gray-900 dark:text-white">
                    {user?.phone || "Not provided"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
