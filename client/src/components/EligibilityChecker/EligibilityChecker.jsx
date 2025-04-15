import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const EligibilityChecker = () => {
  const { user, token } = useAuth();
  const [formData, setFormData] = useState({
    age: '',
    monthlyIncome: '',
    loanAmount: '',
    loanTenure: '',
  });

  const [existingEMI, setExistingEMI] = useState(0);
  const [activeLoans, setActiveLoans] = useState([]);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Fetch active loans and calculate total EMI
  useEffect(() => {
    const fetchActiveLoans = async () => {
      try {
        const res = await fetch(`http://localhost:5005/api/loans/my/${user._id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const loans = await res.json();
        
        // Filter active loans where the user is the borrower
        const userActiveLoans = loans.filter(
          loan => loan.borrower?._id === user._id && loan.status === 'active'
        );
        
        setActiveLoans(userActiveLoans);

        // Calculate total monthly EMI from active loans
        const totalMonthlyEMI = userActiveLoans.reduce((total, loan) => {
          const remainingAmount = loan.totalRepayableAmount - loan.amountRepaid;
          const remainingMonths = Math.ceil(
            (new Date(loan.dueDate) - new Date()) / (1000 * 60 * 60 * 24 * 30)
          );
          const monthlyEMI = remainingAmount / remainingMonths;
          return total + monthlyEMI;
        }, 0);

        setExistingEMI(Math.round(totalMonthlyEMI));
      } catch (error) {
        console.error('Error fetching active loans:', error);
      }
    };

    if (user?._id) {
      fetchActiveLoans();
    }
  }, [user, token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEMI = (principal, tenure, ratePerAnnum) => {
    const monthlyRate = ratePerAnnum / 12 / 100;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenure)) 
      / (Math.pow(1 + monthlyRate, tenure) - 1);
    return Math.round(emi);
  };

  const checkEligibility = () => {
    const age = parseInt(formData.age);
    const monthlyIncome = parseFloat(formData.monthlyIncome);
    const loanAmount = parseFloat(formData.loanAmount);
    const loanTenure = parseInt(formData.loanTenure);

    // Initialize result object
    const eligibilityResult = {
      isEligible: true,
      reasons: [],
      maxLoanAmount: 0,
      suggestedEMI: 0,
      checks: {
        age: false,
        income: false,
        dti: false
      }
    };

    // 1. Age Check (18-60 years)
    if (age < 18 || age > 60) {
      eligibilityResult.isEligible = false;
      eligibilityResult.reasons.push('Age must be between 18 and 60 years');
    } else {
      eligibilityResult.checks.age = true;
    }

    // 2. Minimum Income Check (₹10,000)
    if (monthlyIncome < 10000) {
      eligibilityResult.isEligible = false;
      eligibilityResult.reasons.push('Monthly income must be at least ₹10,000');
    } else {
      eligibilityResult.checks.income = true;
    }

    // 3. Calculate EMI for requested loan (10% interest rate)
    const requestedEMI = calculateEMI(loanAmount, loanTenure, 10);
    const totalEMI = requestedEMI + existingEMI;

    // 4. DTI Ratio Check (max 40% of monthly income)
    const maxAllowedEMI = monthlyIncome * 0.4;
    if (totalEMI > maxAllowedEMI) {
      eligibilityResult.isEligible = false;
      eligibilityResult.reasons.push('Total EMI exceeds 40% of monthly income');
    } else {
      eligibilityResult.checks.dti = true;
    }

    // Calculate maximum loan amount possible
    const availableEMI = maxAllowedEMI - existingEMI;
    if (availableEMI > 0) {
      // Reverse EMI formula to get maximum loan amount
      const monthlyRate = 10 / 12 / 100;
      const maxLoanAmount = (availableEMI * (Math.pow(1 + monthlyRate, loanTenure) - 1)) 
        / (monthlyRate * Math.pow(1 + monthlyRate, loanTenure));
      eligibilityResult.maxLoanAmount = Math.round(maxLoanAmount);
      eligibilityResult.suggestedEMI = Math.round(availableEMI);
    }

    setResult(eligibilityResult);
    setShowResult(true);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Loan Eligibility Checker</h2>
      
      {/* Display Existing EMI Information */}
      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Current Loan Status</h3>
        <div className="space-y-2">
          <p className="text-blue-700">
            Active Loans: {activeLoans.length}
          </p>
          <p className="text-blue-700">
            Total Monthly EMI: {formatCurrency(existingEMI)}
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your age"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Monthly Income (₹)</label>
          <input
            type="number"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter your monthly income"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Required Loan Amount (₹)</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter required loan amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Tenure (months)</label>
          <input
            type="number"
            name="loanTenure"
            value={formData.loanTenure}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter loan tenure in months"
          />
        </div>

        <button
          onClick={checkEligibility}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Check Eligibility
        </button>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-center mb-6">Eligibility Result</h3>
          
          <div className="space-y-6">
            {/* Overall Result */}
            <div className="flex items-center justify-center text-xl font-semibold">
              {result.isEligible ? (
                <div className="text-green-600 flex items-center">
                  <FaCheckCircle className="mr-2" />
                  Congratulations! You are eligible for the loan.
                </div>
              ) : (
                <div className="text-red-600 flex items-center">
                  <FaTimesCircle className="mr-2" />
                  Sorry, you are not eligible for the loan.
                </div>
              )}
            </div>

            {/* Eligibility Checks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg ${result.checks.age ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="font-medium">Age Check</div>
                <div className={result.checks.age ? 'text-green-600' : 'text-red-600'}>
                  {result.checks.age ? 'Passed' : 'Failed'}
                </div>
              </div>
              <div className={`p-4 rounded-lg ${result.checks.income ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="font-medium">Income Check</div>
                <div className={result.checks.income ? 'text-green-600' : 'text-red-600'}>
                  {result.checks.income ? 'Passed' : 'Failed'}
                </div>
              </div>
              <div className={`p-4 rounded-lg ${result.checks.dti ? 'bg-green-100' : 'bg-red-100'}`}>
                <div className="font-medium">DTI Ratio Check</div>
                <div className={result.checks.dti ? 'text-green-600' : 'text-red-600'}>
                  {result.checks.dti ? 'Passed' : 'Failed'}
                </div>
              </div>
            </div>

            {/* Reasons for Rejection */}
            {!result.isEligible && result.reasons.length > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <h4 className="font-semibold text-red-800 mb-2">Reasons:</h4>
                <ul className="list-disc list-inside text-red-700">
                  {result.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Loan Suggestions */}
            {result.maxLoanAmount > 0 && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">Loan Suggestions:</h4>
                <div className="space-y-2 text-blue-700">
                  <p>Maximum Loan Amount: {formatCurrency(result.maxLoanAmount)}</p>
                  <p>Suggested Monthly EMI: {formatCurrency(result.suggestedEMI)}</p>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EligibilityChecker; 