import React, { useState } from "react";
import { FaFileUpload, FaCheckCircle, FaPenFancy } from "react-icons/fa";

const LoanApplication = () => {
  const [step, setStep] = useState(1);
  const [loanDetails, setLoanDetails] = useState({
    amount: "",
    purpose: "",
    employment: "",
  });

  const [documents, setDocuments] = useState({
    panCard: null,
    aadhaarCard: null,
    salarySlip: null,
    bankStatement: null,
    itReturns: null,
  });

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleInputChange = (e) => {
    setLoanDetails({ ...loanDetails, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    if (file) {
      setDocuments({ ...documents, [docType]: file.name });
      alert(`${docType} uploaded successfully!`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Loan Application Process</h2>

      {/* Step 1: Loan Details */}
      {step === 1 && (
        <div>
          <h3>Step 1: Enter Loan Details</h3>
          <label>Loan Amount:</label>
          <input type="number" name="amount" placeholder="Enter amount" value={loanDetails.amount} onChange={handleInputChange} style={styles.input} />

          <label>Purpose of Loan:</label>
          <input type="text" name="purpose" placeholder="Purpose of loan" value={loanDetails.purpose} onChange={handleInputChange} style={styles.input} />

          <label>Employment Status:</label>
          <select name="employment" value={loanDetails.employment} onChange={handleInputChange} style={styles.input}>
            <option value="">Select</option>
            <option value="Employed">Employed</option>
            <option value="Self-Employed">Self-Employed</option>
            <option value="Freelancer">Freelancer</option>
          </select>

          <button onClick={handleNext} style={styles.button}>Next</button>
        </div>
      )}

      {/* Step 2: Upload Documents */}
      {step === 2 && (
        <div>
          <h3>Step 2: Upload Documents</h3>
          <label>PAN Card:</label>
          <input type="file" accept=".jpg, .png, .pdf" onChange={(e) => handleFileUpload(e, "panCard")} style={styles.input} />

          <label>Aadhaar Card:</label>
          <input type="file" accept=".jpg, .png, .pdf" onChange={(e) => handleFileUpload(e, "aadhaarCard")} style={styles.input} />

          <label>Salary Slip:</label>
          <input type="file" accept=".jpg, .png, .pdf" onChange={(e) => handleFileUpload(e, "salarySlip")} style={styles.input} />

          <label>Bank Statement:</label>
          <input type="file" accept=".jpg, .png, .pdf" onChange={(e) => handleFileUpload(e, "bankStatement")} style={styles.input} />

          <label>IT Returns:</label>
          <input type="file" accept=".jpg, .png, .pdf" onChange={(e) => handleFileUpload(e, "itReturns")} style={styles.input} />

          <button onClick={handleBack} style={styles.buttonSecondary}>Back</button>
          <button onClick={handleNext} style={styles.button}>Next</button>
        </div>
      )}

      {/* Step 3: KYC Verification */}
      {step === 3 && (
        <div>
          <h3>Step 3: KYC Verification</h3>
          <p>Your KYC verification is in process.</p>
          <FaCheckCircle style={styles.successIcon} />
          <p>Please wait while we verify your documents.</p>

          <button onClick={handleBack} style={styles.buttonSecondary}>Back</button>
          <button onClick={handleNext} style={styles.button}>Next</button>
        </div>
      )}

      {/* Step 4: Digital Agreement Signing */}
      {step === 4 && (
        <div>
          <h3>Step 4: Digital Agreement Signing</h3>
          <p>Review and sign the loan agreement digitally.</p>
          <FaPenFancy style={styles.successIcon} />
          <button onClick={() => alert("Agreement Signed! Loan Application Submitted.")} style={styles.button}>Sign & Submit</button>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", width: "400px", margin: "auto", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
  input: { width: "100%", padding: "10px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { backgroundColor: "#28a745", color: "white", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", border: "none", margin: "5px" },
  buttonSecondary: { backgroundColor: "#007bff", color: "white", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", border: "none", margin: "5px" },
  successIcon: { fontSize: "50px", color: "#28a745", margin: "10px" },
};

export default LoanApplication;
