import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/navbar";
import Home from "./components/Home/Home";
import OurVision from "./components/OurVision/OurVision";
import Banner from "./components/Banner/Banner";
import Banner2 from "./components/Banner/Banner2";
import VideoBanner from "./components/Video Banner/VideoBanner";
import Blogs from "./components/Blogs/Blogs";
import Footer from "./components/Footer/Footer";
import BorrowerDashboard from "./components/BorrowerDashboard/BorrowerDashboard";
import LenderDashboard from "./components/LenderDashboard/LenderDashboard";
import Registration from "./components/Registration/Registration";
import Login from "./components/Login/Login";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import ChatBot from "./components/Chatbot/chatbot";

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/" />;
};

function AppContent() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { isAuthenticated,user } = useAuth();

  // Open the login modal
  const handleLoginOpen = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  // Close the login modal
  const handleLoginClose = () => {
    setShowLogin(false);
  };

  // Open the registration modal
  const handleRegisterOpen = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  // Close the registration modal
  const handleRegisterClose = () => {
    setShowRegister(false);
  };

  return (
    <main className="overflow-x-hidden bg-white dark:bg-gray-900 min-h-screen flex flex-col">
      <Navbar onLoginClick={handleLoginOpen} onRegisterClick={handleRegisterOpen} />
      <ChatBot />
      <div className="flex-grow">
        <Routes>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                {user?.role === "lender" ? <LenderDashboard /> : <BorrowerDashboard />}
              </ProtectedRoute>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Home 
                  openLogin={handleLoginOpen} 
                  openRegister={handleRegisterOpen}
                />
                <OurVision />
                <Banner />
                <Banner2 />
                <VideoBanner />
                <Blogs />
              </>
            }
          />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      <Footer />

      {/* Login Modal */}
      {showLogin && (
        <div className="modal-overlay">
          <div className="login-modal">
            <Login onClose={handleLoginClose} onRegisterClick={handleRegisterOpen} />
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegister && (
        <div className="modal-overlay">
          <div className="registration-modal">
            <Registration onClose={handleRegisterClose} onLoginClick={handleLoginOpen} />
          </div>
        </div>
      )}
    </main>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
