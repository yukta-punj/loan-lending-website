import React, { useState, useEffect } from 'react';
import { FaBell } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '../../context/AuthContext';

// Define API_BASE_URL directly instead of importing it
const API_BASE_URL = "http://localhost:5005/api";

const AlertsDropdown = () => {
  const [alerts, setAlerts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const { user } = useAuth();

  const fetchAlerts = async () => {
    if (!user?._id) {
      console.log('No user ID available:', user);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      console.log('Fetching alerts for user:', user._id);
      const response = await axios.get(`${API_BASE_URL}/alerts/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Fetched alerts:', response.data); // Debug log
      setAlerts(response.data);
      setUnreadCount(response.data.filter(alert => !alert.read).length);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  const markAsRead = async (alertId) => {
    if (!user?._id) return;
    
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`${API_BASE_URL}/alerts/${alertId}/read`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAlerts(alerts.map(alert => 
        alert._id === alertId ? { ...alert, read: true } : alert
      ));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch (error) {
      console.error('Error marking alert as read:', error);
    }
  };

  useEffect(() => {
    if (user?._id) {
      console.log('User ID available, fetching alerts:', user._id);
      fetchAlerts();
      // Poll for new alerts every minute
      const interval = setInterval(fetchAlerts, 60000);
      return () => clearInterval(interval);
    } else {
      console.log('No user ID available in useEffect');
    }
  }, [user?._id]);

  if (!user?._id) {
    console.log('No user ID available, not rendering alerts dropdown');
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 
                   transition-colors focus:outline-none"
      >
        <FaBell className="text-gray-600 dark:text-gray-300" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full 
                         w-5 h-5 flex items-center justify-center text-xs">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg 
                     shadow-lg ring-1 ring-black ring-opacity-5 py-2 max-h-96 overflow-y-auto"
          >
            {alerts.length === 0 ? (
              <div className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400">
                No notifications
              </div>
            ) : (
              alerts.map(alert => (
                <div
                  key={alert._id}
                  className={`px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 
                           cursor-pointer transition-colors ${
                             !alert.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                           }`}
                  onClick={() => markAsRead(alert._id)}
                >
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {alert.message}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {formatDistanceToNow(new Date(alert.createdAt), { addSuffix: true })}
                  </div>
                </div>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AlertsDropdown; 