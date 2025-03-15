import React from "react";
import HeroImg from "../../assets/blogs/project-slide1.png";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";

const Hero = ({ openLogin, openRegister, openDashboard }) => {
  const navigate = useNavigate();

  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="sm:text-center lg:text-left"
            >
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block mb-2">Get the loan</span>
                <span className="block text-blue-600 dark:text-blue-400">you deserve</span>
              </h1>
              <p className="mt-6 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Quick and easy loans for all your needs. Apply now and get instant approval with minimal documentation.
              </p>
              <div className="mt-8 sm:mt-12 sm:flex sm:justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-4">
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={openRegister}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl"
                  >
                    Get Started
                  </button>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <button
                    onClick={openLogin}
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900 dark:hover:bg-blue-800 transition-colors duration-200 md:py-4 md:text-lg md:px-10 shadow-lg hover:shadow-xl"
                  >
                    Login
                  </button>
                </motion.div>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-transparent dark:from-blue-400/20"></div>
          <img
            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
            src={HeroImg}
            alt="Loan application"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
