import React from "react";
import {
    FaFacebook,
    FaInstagram,
    FaLinkedin,
    FaLocationArrow,
    FaMobileAlt,
    FaTwitter,
} from "react-icons/fa";

const importantLinks = [
    { name: "Home", link: "/home" },
    { name: "About", link: "/about" },
    { name: "Service", link: "/service" },
    { name: "Login", link: "/login" },
];

const links = [
    { name: "Privacy Policy", link: "/privacy" },
    { name: "Service", link: "/service" },
    { name: "About Us", link: "/about" },
];

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Leisure Loan</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Providing quick and easy loans for all your needs. Apply now and get instant approval.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#home" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    About Us
                                </a>
                            </li>
                            <li>
                                <a href="/services" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Services
                                </a>
                            </li>
                            <li>
                                <a href="#contact" className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Our Services</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Home Loans
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Personal Loans
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Business Loans
                            </li>
                            <li className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                                    Education Loans
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact Us</h3>
                        <ul className="space-y-2">
                            <li className="text-gray-600 dark:text-gray-400">
                                123 Loan Street
                            </li>
                            <li className="text-gray-600 dark:text-gray-400">
                                City, State 12345
                            </li>
                            <li className="text-gray-600 dark:text-gray-400">
                                Phone: (123) 456-7890
                            </li>
                            <li className="text-gray-600 dark:text-gray-400">
                                Email: info@leisureloan.com
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <FaFacebook className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <FaTwitter className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <FaInstagram className="h-6 w-6" />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-blue-500 dark:hover:text-blue-400">
                            <FaLinkedin className="h-6 w-6" />
                        </a>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 text-center text-gray-500 dark:text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Leisure Loan. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
