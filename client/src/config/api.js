const API_BASE_URL = "http://localhost:5005/api";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,
  VERIFY_TOKEN: `${API_BASE_URL}/auth/verify-token`,
  //SEND_OTP: `${API_BASE_URL}/auth/send-otp`,

  // User endpoints
  GET_USER_PROFILE: `${API_BASE_URL}/users/profile`,
  UPDATE_USER_PROFILE: `${API_BASE_URL}/users/profile`,
  CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,

  // Loan endpoints
  GET_LOANS: `${API_BASE_URL}/loans`,
  GET_LOAN_DETAILS: (loanId) => `${API_BASE_URL}/loans/${loanId}`,
  APPLY_FOR_LOAN: `${API_BASE_URL}/loans/apply`,
  UPDATE_LOAN_STATUS: (loanId) => `${API_BASE_URL}/loans/${loanId}/status`,
  GET_LOAN_HISTORY: `${API_BASE_URL}/loans/history`,

  // Payment endpoints
  GET_PAYMENTS: `${API_BASE_URL}/payments`,
  MAKE_PAYMENT: `${API_BASE_URL}/payments/make`,
  GET_PAYMENT_HISTORY: `${API_BASE_URL}/payments/history`,
  RESCHEDULE_PAYMENT: (paymentId) =>
    `${API_BASE_URL}/payments/${paymentId}/reschedule`,
};

export default API_ENDPOINTS;
