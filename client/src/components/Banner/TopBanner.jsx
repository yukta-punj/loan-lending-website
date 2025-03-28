import React from 'react';
import { motion } from 'framer-motion';

const TopBanner = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative w-full bg-gradient-to-r from-orange-100 to-orange-200 dark:from-orange-900/20 dark:to-orange-800/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          {/* Left side - Text */}
          <div className="mb-6 md:mb-0 md:mr-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-4">
              Your trusted place for easy and secure loans!
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Get instant access to loans with competitive interest rates and flexible repayment options.
            </p>
          </div>
          
          {/* Right side - Image */}
          <div className="relative">
            <div className="flex items-center">
              {/* Stacked coins */}
              <div className="relative h-32 flex items-end mr-4">
                <div className="flex flex-col-reverse">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-16 h-4 rounded-full bg-yellow-400 dark:bg-yellow-500 border border-yellow-500 -mb-2"
                      style={{
                        transform: `translateY(${i * 4}px)`,
                        zIndex: 4 - i
                      }}
                    />
                  ))}
                </div>
              </div>
              
              {/* Tree with coins */}
              <div className="relative">
                <div className="w-32 h-32">
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                    <div className="w-16 h-16 bg-green-500 rounded-full" />
                    <div className="w-4 h-12 bg-brown-500 absolute bottom-0 left-1/2 transform -translate-x-1/2" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-yellow-400 dark:bg-yellow-500 rounded-full border-2 border-yellow-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TopBanner; 