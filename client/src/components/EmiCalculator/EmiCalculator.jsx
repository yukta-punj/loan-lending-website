import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EmiCalculator = () => {
  const [formData, setFormData] = useState({
    loanAmount: '',
    interestRate: '',
    tenure: '',
    tenureType: 'months' // months or years
  });

  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateEMI = () => {
    // Convert tenure to months if in years
    const tenureInMonths = formData.tenureType === 'years' 
      ? parseFloat(formData.tenure) * 12 
      : parseFloat(formData.tenure);

    const principal = parseFloat(formData.loanAmount);
    const annualRate = parseFloat(formData.interestRate);
    const monthlyRate = annualRate / 12 / 100;
    const numberOfMonths = tenureInMonths;

    // EMI = P × R × (1 + R)^N / ((1 + R)^N - 1)
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths) 
      / (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const totalPayment = emi * numberOfMonths;
    const totalInterest = totalPayment - principal;

    setResult({
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      numberOfMonths
    });
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
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">EMI Calculator</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Amount (₹)</label>
          <input
            type="number"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter loan amount"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Interest Rate (% per annum)</label>
          <input
            type="number"
            name="interestRate"
            value={formData.interestRate}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter interest rate"
            step="0.1"
          />
        </div>

        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Loan Tenure</label>
            <input
              type="number"
              name="tenure"
              value={formData.tenure}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Enter tenure"
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700">Tenure Type</label>
            <select
              name="tenureType"
              value={formData.tenureType}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="months">Months</option>
              <option value="years">Years</option>
            </select>
          </div>
        </div>

        <button
          onClick={calculateEMI}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate EMI
        </button>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-center mb-4">Loan Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Monthly EMI:</span>
              <span className="text-xl font-bold text-blue-600">{formatCurrency(result.emi)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Interest:</span>
              <span className="text-xl font-bold text-red-600">{formatCurrency(result.totalInterest)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Total Payment:</span>
              <span className="text-xl font-bold text-green-600">{formatCurrency(result.totalPayment)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Loan Tenure:</span>
              <span className="text-xl font-bold text-gray-800">{result.numberOfMonths} months</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default EmiCalculator; 