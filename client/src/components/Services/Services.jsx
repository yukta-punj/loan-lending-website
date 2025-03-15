import React from 'react';
import { motion } from 'framer-motion';
import { FaHome, FaCar, FaGraduationCap, FaBriefcase, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';

const services = [
  {
    title: "Home Loan",
    icon: <FaHome className="text-4xl text-primary" />,
    description: "Get the home of your dreams with our competitive home loan rates. Flexible tenure and quick processing.",
    features: [
      "Competitive interest rates",
      "Flexible repayment options",
      "Quick processing",
      "No hidden charges"
    ],
    eligibility: "Salaried/self-employed with stable income",
    minAmount: "₹5,00,000",
    maxAmount: "₹5,00,00,000"
  },
  {
    title: "Vehicle Loan",
    icon: <FaCar className="text-4xl text-primary" />,
    description: "Drive home your dream vehicle with our hassle-free vehicle loans. Quick approval and minimal documentation.",
    features: [
      "Zero processing fee",
      "Flexible EMI options",
      "Quick disbursement",
      "Competitive rates"
    ],
    eligibility: "Age 21-65 years with stable income",
    minAmount: "₹1,00,000",
    maxAmount: "₹50,00,000"
  },
  {
    title: "Education Loan",
    icon: <FaGraduationCap className="text-4xl text-primary" />,
    description: "Invest in your future with our education loans. Support for both domestic and international education.",
    features: [
      "Coverage for all courses",
      "Moratorium period",
      "No collateral for small amounts",
      "Tax benefits"
    ],
    eligibility: "Indian citizen with admission letter",
    minAmount: "₹50,000",
    maxAmount: "₹1,00,00,000"
  },
  {
    title: "Business Loan",
    icon: <FaBriefcase className="text-4xl text-primary" />,
    description: "Grow your business with our unsecured business loans. Quick processing and minimal documentation.",
    features: [
      "No collateral required",
      "Quick approval",
      "Flexible repayment",
      "Competitive rates"
    ],
    eligibility: "Business owner with 3+ years experience",
    minAmount: "₹2,00,000",
    maxAmount: "₹2,00,00,000"
  },
  {
    title: "Personal Loan",
    icon: <FaHandHoldingUsd className="text-4xl text-primary" />,
    description: "Meet your personal financial needs with our instant personal loans. No end-use restrictions.",
    features: [
      "Instant approval",
      "No collateral",
      "Flexible tenure",
      "Minimal documentation"
    ],
    eligibility: "Salaried/self-employed with good credit score",
    minAmount: "₹25,000",
    maxAmount: "₹20,00,000"
  },
  {
    title: "Investment Loan",
    icon: <FaChartLine className="text-4xl text-primary" />,
    description: "Grow your wealth with our investment loans. Invest in stocks, mutual funds, or other financial instruments.",
    features: [
      "Competitive rates",
      "Flexible tenure",
      "Quick processing",
      "Investment guidance"
    ],
    eligibility: "Regular income with investment experience",
    minAmount: "₹1,00,000",
    maxAmount: "₹50,00,000"
  }
];

const Services = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Loan Services
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover our comprehensive range of loan products designed to meet your financial needs. 
            Choose from various options with competitive rates and flexible terms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-6">
                <div className="flex items-center justify-center mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                  {service.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Min Amount</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{service.minAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Max Amount</p>
                        <p className="font-semibold text-gray-900 dark:text-white">{service.maxAmount}</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Eligibility</p>
                    <p className="text-gray-600 dark:text-gray-300">{service.eligibility}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <button className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors duration-200">
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services; 