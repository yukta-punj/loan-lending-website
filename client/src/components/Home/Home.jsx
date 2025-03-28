import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHandHoldingUsd, FaUserTie, FaChartLine, FaShieldAlt, FaClock, FaCheckCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';
import VideoBanner from '../Video Banner/VideoBanner';
import Blogs from '../Blogs/Blogs';
import Registration from '../Registration/Registration';
import OverviewCounter from '../OverviewCounter/OverviewCounter';
import TopBanner from '../Banner/TopBanner';
import HeroImg from '../../assets/blogs/project-slide1.png';

const Home = ({ openLogin, openRegister }) => {
  const { isAuthenticated, user } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setShowRegistrationModal(true);
  };

  const handleCloseModal = () => {
    setShowRegistrationModal(false);
    setSelectedRole(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <TopBanner />
      <OverviewCounter />
      
      {/* Role Selection Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Whether you want to invest or borrow, we have the perfect solution for you.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Lender Placard */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <FaUserTie className="text-5xl text-blue-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Become a Lender
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Invest your money and earn attractive returns. Our platform provides a secure and transparent way to lend money to verified borrowers.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    High returns on investment
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Diversified portfolio options
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Secure lending process
                  </li>
                </ul>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleRoleSelect('lender')}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  >
                    Register as Lender
                  </button>
                  <button
                    onClick={() => openLogin()}
                    className="w-full bg-blue-100 text-blue-600 py-3 rounded-lg hover:bg-blue-200 transition-colors duration-200"
                  >
                    Login as Lender
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Borrower Placard */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="bg-white dark:bg-gray-700 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="p-8">
                <div className="flex items-center justify-center mb-6">
                  <FaHandHoldingUsd className="text-5xl text-green-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 text-center">
                  Apply for a Loan
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Get quick and easy access to loans with competitive interest rates. Our platform connects you with verified lenders.
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Quick approval process
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Competitive interest rates
                  </li>
                  <li className="flex items-center text-gray-600 dark:text-gray-300">
                    <FaCheckCircle className="text-green-500 mr-2" />
                    Flexible repayment options
                  </li>
                </ul>
                <div className="flex flex-col gap-4">
                  <button
                    onClick={() => handleRoleSelect('borrower')}
                    className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Register as Borrower
                  </button>
                  <button
                    onClick={() => openLogin()}
                    className="w-full bg-green-100 text-green-600 py-3 rounded-lg hover:bg-green-200 transition-colors duration-200"
                  >
                    Login as Borrower
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              We provide the best experience for both lenders and borrowers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaShieldAlt className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Secure Platform
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your data and transactions are protected with industry-standard security measures.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-green-100 dark:bg-green-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaChartLine className="text-2xl text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Competitive Rates
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get the best interest rates in the market for both lending and borrowing.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-purple-100 dark:bg-purple-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaClock className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quick Process
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fast approval and disbursement process for both lenders and borrowers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Simple steps to get started with your loan
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-300 dark:bg-blue-700 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Choose Your Role
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Select whether you want to lend or borrow
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-green-300 dark:bg-green-700 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-green-600 dark:text-green-400">2</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Complete Profile
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fill in your details and verify your identity
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-purple-200 dark:bg-purple-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-purple-300 dark:bg-purple-700 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">3</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Get Matched
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with suitable lenders or borrowers
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-center"
            >
              <div className="relative w-32 h-32 mx-auto mb-6">
                <div className="absolute inset-0 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center">
                  <div className="w-24 h-24 bg-yellow-200 dark:bg-yellow-800 rounded-full flex items-center justify-center">
                    <div className="w-16 h-16 bg-yellow-300 dark:bg-yellow-700 rounded-full flex items-center justify-center">
                      <span className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">4</span>
                    </div>
                  </div>
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Start Transacting
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Complete your loan transaction securely
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationModal && (
        <Registration
          onClose={handleCloseModal}
          onLoginClick={() => {
            handleCloseModal();
            openLogin();
          }}
          initialRole={selectedRole}
        />
      )}
    </div>
  );
};

export default Home; 