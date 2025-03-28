import React, { useState } from 'react';
import { motion } from 'framer-motion';

const CibilScoreCalculator = () => {
  const [formData, setFormData] = useState({
    monthlyIncome: '',
    creditCardUsage: 'low',
    repaymentHistory: 'good',
    existingLoans: '0',
    creditAge: ''
  });

  const [score, setScore] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateScore = () => {
    let baseScore = 300;

    // Income-based points (up to 100 points)
    const income = parseInt(formData.monthlyIncome);
    if (income >= 50000) baseScore += 100;
    else if (income >= 30000) baseScore += 50;
    else if (income >= 15000) baseScore += 25;

    // Credit Card Usage points
    switch (formData.creditCardUsage) {
      case 'low':
        baseScore += 150;
        break;
      case 'moderate':
        baseScore += 75;
        break;
      case 'high':
        baseScore -= 100;
        break;
      default:
        break;
    }

    // Repayment History points
    switch (formData.repaymentHistory) {
      case 'good':
        baseScore += 200;
        break;
      case 'average':
        baseScore += 100;
        break;
      case 'poor':
        baseScore -= 50;
        break;
      default:
        break;
    }

    // Existing Loans points
    const loans = parseInt(formData.existingLoans);
    if (loans === 0) baseScore += 100;
    else if (loans === 1) baseScore += 50;
    else baseScore -= 50;

    // Credit Age points (up to 100 points)
    const creditAge = parseInt(formData.creditAge);
    if (creditAge >= 5) baseScore += 100;
    else if (creditAge >= 3) baseScore += 50;
    else if (creditAge >= 1) baseScore += 25;

    // Ensure score stays within 300-900 range
    baseScore = Math.min(Math.max(baseScore, 300), 900);

    setScore(baseScore);
    setShowResult(true);
  };

  const getScoreCategory = (score) => {
    if (score >= 750) return 'Excellent';
    if (score >= 600) return 'Average';
    return 'Poor';
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">CIBIL Score Calculator</h2>
      
      <div className="space-y-6">
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
          <label className="block text-sm font-medium text-gray-700">Credit Card Usage</label>
          <select
            name="creditCardUsage"
            value={formData.creditCardUsage}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Low</option>
            <option value="moderate">Moderate</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Loan Repayment History</label>
          <select
            name="repaymentHistory"
            value={formData.repaymentHistory}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="good">Good</option>
            <option value="average">Average</option>
            <option value="poor">Poor</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Existing Loans</label>
          <select
            name="existingLoans"
            value={formData.existingLoans}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="0">None</option>
            <option value="1">One</option>
            <option value="2">Two or more</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Credit Age (Years)</label>
          <input
            type="number"
            name="creditAge"
            value={formData.creditAge}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Enter credit age in years"
          />
        </div>

        <button
          onClick={calculateScore}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Calculate Score
        </button>
      </div>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 p-6 bg-gray-50 rounded-lg"
        >
          <h3 className="text-2xl font-semibold text-center mb-4">Your CIBIL Score</h3>
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-600 mb-2">{score}</div>
            <div className="text-xl font-medium text-gray-700">
              Category: {getScoreCategory(score)}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CibilScoreCalculator; 