import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaCar, FaGraduationCap, FaBriefcase, FaHandHoldingUsd, FaChartLine } from 'react-icons/fa';
import { loanImages } from './loanImages';

const services = [
  {
    title: "Home Loan",
    icon: <FaHome className="text-4xl text-blue-600" />,
    description: "Get the home of your dreams with our competitive home loan rates. Flexible tenure and quick processing.",
    features: [
      "Competitive interest rates",
      "Flexible repayment options",
      "Quick processing",
      "No hidden charges"
    ],
    eligibility: "Salaried/self-employed with stable income",
    minAmount: "₹5,00,000",
    maxAmount: "₹5,00,00,000",
    color: "blue",
    image: loanImages.homeLoan
  },
  {
    title: "Vehicle Loan",
    icon: <FaCar className="text-4xl text-green-600" />,
    description: "Drive home your dream vehicle with our hassle-free vehicle loans. Quick approval and minimal documentation.",
    features: [
      "Zero processing fee",
      "Flexible EMI options",
      "Quick disbursement",
      "Competitive rates"
    ],
    eligibility: "Age 21-65 years with stable income",
    minAmount: "₹1,00,000",
    maxAmount: "₹50,00,000",
    color: "green",
    image: loanImages.vehicleLoan
  },
  {
    title: "Education Loan",
    icon: <FaGraduationCap className="text-4xl text-purple-600" />,
    description: "Invest in your future with our education loans. Support for both domestic and international education.",
    features: [
      "Coverage for all courses",
      "Moratorium period",
      "No collateral for small amounts",
      "Tax benefits"
    ],
    eligibility: "Indian citizen with admission letter",
    minAmount: "₹50,000",
    maxAmount: "₹1,00,00,000",
    color: "purple",
    image: loanImages.educationLoan
  },
  {
    title: "Business Loan",
    icon: <FaBriefcase className="text-4xl text-orange-600" />,
    description: "Grow your business with our unsecured business loans. Quick processing and minimal documentation.",
    features: [
      "No collateral required",
      "Quick approval",
      "Flexible repayment",
      "Competitive rates"
    ],
    eligibility: "Business owner with 3+ years experience",
    minAmount: "₹2,00,000",
    maxAmount: "₹2,00,00,000",
    color: "orange",
    image: loanImages.businessLoan
  },
  {
    title: "Personal Loan",
    icon: <FaHandHoldingUsd className="text-4xl text-red-600" />,
    description: "Meet your personal financial needs with our instant personal loans. No end-use restrictions.",
    features: [
      "Instant approval",
      "No collateral",
      "Flexible tenure",
      "Minimal documentation"
    ],
    eligibility: "Salaried/self-employed with good credit score",
    minAmount: "₹25,000",
    maxAmount: "₹20,00,000",
    color: "red",
    image: loanImages.personalLoan
  },
  {
    title: "Investment Loan",
    icon: <FaChartLine className="text-4xl text-indigo-600" />,
    description: "Grow your wealth with our investment loans. Invest in stocks, mutual funds, or other financial instruments.",
    features: [
      "Competitive rates",
      "Flexible tenure",
      "Quick processing",
      "Investment guidance"
    ],
    eligibility: "Regular income with investment experience",
    minAmount: "₹1,00,000",
    maxAmount: "₹50,00,000",
    color: "indigo",
    image: loanImages.investmentLoan
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Our Loan Services
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Choose from our wide range of loan products designed to meet your financial needs
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 border-t-4 border-${service.color}-600`}
            >
              <div className="relative h-48">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 z-10" />
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <div className="flex items-center space-x-2">
                    {service.icon}
                    <h3 className="text-2xl font-semibold text-white">
                      {service.title}
                    </h3>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {service.description}
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Key Features</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center text-gray-600 dark:text-gray-300">
                          <span className={`w-2 h-2 bg-${service.color}-600 rounded-full mr-2`}></span>
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
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services; 