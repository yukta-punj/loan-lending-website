# Loan Lending Website
The loan lending website is a web application designed to simplify the process of connecting borrowers with lenders. It allows users to create accounts, apply for loans, lend small amounts of money.

## Features
- User authentication and authorization
- Personalized dashhboards
- Loan application and management
- Real-time notifications
- Secure document upload
- Chat assisstant
- Responsive design with modern UI
- Cibil score and Eligibility checker


## Tech Stack

### Frontend
- React.js
- Vite
- TailwindCSS
- Framer Motion

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Multer (File Upload)
- Bcrypt (Password Hashing)


## Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm package
- a modern web browser


## Installation

1. Clone the repository:
```bash
git clone https://github.com/yukta-punj/loan-lending-website]
cd loan-lending-website
```

2. Install root dependencies:
```bash
npm install
```

3. Install client dependencies:
```bash
cd client
npm install
```

4. Install server dependencies:
```bash
cd ../server
npm install
```

5. Create a `.env` file in the server directory with the following variables:
```env
PORT=5005
MONGODB_URI=mongodb://localhost:27017/
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the development server (runs both frontend and backend):
```bash
npm run dev
```

2. Or run them separately:

Frontend:
```bash
cd client
npm run dev
```

Backend:
```bash
cd server
npm run dev
```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5005`.


## How to use

### As a Lender
1. Navigate to the home page and register as a lender.
2. Navigate to the dashboard, in account dropdown.
3. Go to 'New Loan' tab, fill in the requistes and submit.
4. You have created a loan, and will receive an alert for the same.
5. You can check for the same under 'Unassigned Loans' subheading.
6. After the borrower has applied for the loan, you'll be able to see the details of the borrower after clicking on the 'View Details' button for the specific loan.
7. 'Update Status' button helps the lender to update the status of the particular loan as Defaulted, Active, Pending.

### As a Borrower
1. Navigate to the home page and register as a borrower.
2. Navigate to the dashboard, in the account dropdown.
3. Go to 'Available Loans' tab to see the loans available.
4. Apply for the desired loan, by filling in and submitting the requistes.
5. Check for the applied loans under 'My Loans' tab.
6. You can pay through 'Pay' button visible under each applied loan.
7. In Cibil Score and Check Eligibility tabs, you can check for the respecitive items, by filling in the required fields.



## Project Structure

```
loan-lending-website/
├── client/                 # Frontend React application
│   ├── src/               # Source files
│   ├── public/            # Static files
│   └── package.json       # Frontend dependencies
├── server/                # Backend Node.js application
│   ├── controllers/       # Route controllers
│   ├── models/           # Database models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   └── package.json      # Backend dependencies
└── package.json          # Root package.json
```

## Future Improvements
- Integrate Email notifications and OTP verifications.
- Enhance Borrower experience by adding 'Apply for Loan' option.


## Contact
Your Name - [btbts22039_yukta@banasthali.in]

Project Link: [https://github.com/yukta-punj/loan-lending-website] 
