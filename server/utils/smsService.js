// Function to send OTP via SMS
const sendOTP = async (phoneNumber, otp) => {
  // Development mode: just log the OTP
  console.log('\x1b[33m%s\x1b[0m', `[DEV MODE] OTP for ${phoneNumber}: ${otp}`);
  
  // If Twilio credentials are available, use them
  if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
    try {
      const twilio = require('twilio');
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      const message = await client.messages.create({
        body: `Your OTP for Loan Lending Website is: ${otp}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phoneNumber
      });
      
      return {
        success: true,
        messageId: message.sid
      };
    } catch (error) {
      console.error('SMS sending failed:', error);
      // Fall back to development mode
      return {
        success: true,
        dev: true,
        message: 'Using development mode: Check server console for OTP'
      };
    }
  }
  
  // Return success in development mode
  return {
    success: true,
    dev: true,
    message: 'Using development mode: Check server console for OTP'
  };
};

// Function to validate phone number format
const isValidPhoneNumber = (phoneNumber) => {
  // Basic phone number validation (can be enhanced based on your requirements)
  const phoneRegex = /^\+?[1-9]\d{9,14}$/;
  return phoneRegex.test(phoneNumber);
};

module.exports = {
  sendOTP,
  isValidPhoneNumber
}; 