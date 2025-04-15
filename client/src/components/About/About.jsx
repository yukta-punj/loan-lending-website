import React from 'react';
import { motion } from 'framer-motion';
import { FaHandshake, FaShieldAlt, FaChartLine, FaUserShield, FaClock, FaHeadset } from 'react-icons/fa';

const features = [
  {
    icon: <FaHandshake className="text-4xl text-primary" />,
    title: "Trusted Partner",
    description: "We've been helping people achieve their financial goals for years, building lasting relationships with our customers."
  },
  {
    icon: <FaShieldAlt className="text-4xl text-primary" />,
    title: "Secure Platform",
    description: "Your data is protected with industry-standard encryption and security measures to ensure safe transactions."
  },
  {
    icon: <FaChartLine className="text-4xl text-primary" />,
    title: "Competitive Rates",
    description: "We offer some of the most competitive interest rates in the market, helping you save more."
  },
  {
    icon: <FaUserShield className="text-4xl text-primary" />,
    title: "Transparent Process",
    description: "No hidden fees or charges. We believe in complete transparency throughout the loan process."
  },
  {
    icon: <FaClock className="text-4xl text-primary" />,
    title: "Quick Processing",
    description: "Our streamlined process ensures quick loan approval and disbursement within minimal time."
  },
  {
    icon: <FaHeadset className="text-4xl text-primary" />,
    title: "24/7 Support",
    description: "Our dedicated support team is always ready to help you with any queries or concerns."
  }
];

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <div className="bg-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About Leisure Loan
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Empowering financial dreams with innovative lending solutions and exceptional service.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              At Leisure Loan, we're committed to making financial services accessible to everyone. 
              Our mission is to provide innovative lending solutions that help individuals and businesses 
              achieve their goals while maintaining the highest standards of transparency and customer service.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We offer a comprehensive suite of features designed to make your loan experience seamless and efficient.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-center">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Overview */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              We offer a wide range of loan products to meet your diverse financial needs.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Personal Loans
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Instant approval process
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  No collateral required
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Flexible repayment options
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Competitive interest rates
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                Business Loans
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Quick processing time
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Minimal documentation
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Flexible loan amounts
                </li>
                <li className="flex items-center text-gray-600 dark:text-gray-300">
                  <span className="w-2 h-2 bg-primary rounded-full mr-2"></span>
                  Business growth support
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.4 }}
          >
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have found their financial solutions with us.
            </p>
            {/*<button className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Apply Now
            </button>*/}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About; 