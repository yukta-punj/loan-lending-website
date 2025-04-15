import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import AlertsDropdown from "./AlertsDropdown";
import {
  FaSun,
  FaMoon,
  FaBars,
  FaTimes,
  FaChevronDown,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaFileAlt,
  FaHistory,
  FaQuestionCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const ResponsiveMenu = ({ isOpen, onClose, isAuthenticated, onLogout }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-lg rounded-b-lg p-4 md:hidden"
        >
          <div className="flex flex-col space-y-4">
            <Link to="/" className="nav-link" onClick={onClose}>
              Home
            </Link>
            <Link to="/about" className="nav-link" onClick={onClose}>
              About
            </Link>
            <Link to="/services" className="nav-link" onClick={onClose}>
              Services
            </Link>
            <Link to="/contact" className="nav-link" onClick={onClose}>
              Contact
            </Link>
            {!isAuthenticated ? (
              <>
                <button className="btn-primary w-full" onClick={onClose}>
                  Login
                </button>
                <button className="btn-secondary w-full" onClick={onClose}>
                  Register
                </button>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="nav-link" onClick={onClose}>
                  Dashboard
                </Link>
                <button className="btn-danger w-full" onClick={onLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const Navbar = ({ onLoginClick, onRegisterClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { isAuthenticated, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToFooter = () => {
    const footer = document.querySelector("footer");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-lg w-full z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left Section: Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="text-2xl font-bold text-primary dark:text-white transition-colors"
            >
              Leisure Loan
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="nav-link px-3 py-2 rounded-md text-sm font-medium 
                         text-gray-700 dark:text-gray-200 hover:text-primary 
                         transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link px-3 py-2 rounded-md text-sm font-medium 
                         text-gray-700 dark:text-gray-200 hover:text-primary 
                         transition-colors"
            >
              About
            </Link>
            <Link
              to="/services"
              className="nav-link px-3 py-2 rounded-md text-sm font-medium 
                         text-gray-700 dark:text-gray-200 hover:text-primary 
                         transition-colors"
            >
              Services
            </Link>
            <button
              onClick={scrollToFooter}
              className="nav-link px-3 py-2 rounded-md text-sm font-medium 
                         text-gray-700 dark:text-gray-200 hover:text-primary 
                         transition-colors"
            >
              Contact
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                         transition-colors"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
            </button>

            {/* Alerts Dropdown */}
            {isAuthenticated && <AlertsDropdown />}

            {/* Authenticated Dropdown */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-md 
                             text-gray-700 dark:text-gray-200 hover:text-primary 
                             transition-colors"
                >
                  <FaUser />
                  <span>Account</span>
                  <FaChevronDown
                    className={`transform transition-transform ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 
                                 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 
                                 py-2"
                    >
                      <Link
                        to="/dashboard"
                        className="dropdown-item flex items-center px-4 py-2 text-sm 
                                   text-gray-700 dark:text-gray-200 
                                   hover:bg-gray-100 dark:hover:bg-gray-700 
                                   transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        <FaUser className="mr-2" />
                        Dashboard
                      </Link>

                      <div className="border-t border-gray-200 dark:border-gray-700 my-2"></div>

                      <button
                        onClick={() => {
                          handleLogout();
                          setIsDropdownOpen(false);
                        }}
                        className="dropdown-item flex items-center px-4 py-2 text-sm 
                                   text-red-600 dark:text-red-400 
                                   hover:bg-gray-100 dark:hover:bg-gray-700 
                                   transition-colors w-full text-left"
                      >
                        <FaSignOutAlt className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button
                  onClick={onLoginClick}
                  className="btn-primary bg-primary text-white px-4 py-2 rounded-md 
                             hover:bg-primary-dark transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={onRegisterClick}
                  className="btn-secondary border border-primary text-primary 
                             px-4 py-2 rounded-md hover:bg-gray-100 
                             dark:hover:bg-gray-700 transition-colors"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 dark:text-gray-200 hover:text-primary 
                         transition-colors"
            >
              {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <ResponsiveMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
