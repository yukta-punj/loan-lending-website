import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaMoneyBillWave, FaHandshake, FaChartLine } from "react-icons/fa";

const OverviewCounter = () => {
  const stats = [
    {
      title: "Active Users",
      value: "10K+",
      icon: <FaUsers className="w-8 h-8" />,
      description: "Happy customers using our platform"
    },
    {
      title: "Loans Disbursed",
      value: "₹50Cr+",
      icon: <FaMoneyBillWave className="w-8 h-8" />,
      description: "Total amount disbursed to customers"
    },
    {
      title: "Success Rate",
      value: "98%",
      icon: <FaHandshake className="w-8 h-8" />,
      description: "Loan approval success rate"
    },
    {
      title: "Growth Rate",
      value: "25%",
      icon: <FaChartLine className="w-8 h-8" />,
      description: "Year over year growth"
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl"
          >
            Our Impact in Numbers
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-4 text-lg text-gray-500 dark:text-gray-400"
          >
            Trusted by thousands of customers across India
          </motion.p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-md bg-blue-500 text-white mb-4">
                {stat.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </h3>
              <p className="text-lg font-medium text-gray-600 dark:text-gray-300 mb-2">
                {stat.title}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OverviewCounter;
