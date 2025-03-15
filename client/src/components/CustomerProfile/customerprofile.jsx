import React, { useState, useEffect } from "react";
import { FaUserEdit, FaSave, FaCamera, FaFileUpload, FaLock, FaKey } from "react-icons/fa";

const CustomerProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "John Doe",
    dob: "1990-01-01",
    phone: "9876543210",
    email: "john@example.com",
    address: "123 Main St, New York",
    aadhaar: "1234-5678-9012",
    pan: "ABCDE1234F",
    income: "75,000",
    employment: "Employed",
    creditScore: "780",
    profilePic: "",
  });

  const [documents, setDocuments] = useState({
    salarySlip: null,
    bankStatement: null,
    aadhaarCard: null,
    panCard: null,
  });

  // Load data from local storage when the component mounts
  useEffect(() => {
    const storedProfile = localStorage.getItem("customerProfile");
    const storedDocuments = localStorage.getItem("customerDocuments");

    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    if (storedDocuments) {
      setDocuments(JSON.parse(storedDocuments));
    }
  }, []);

  const handleInputChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleFileUpload = (e, docType) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const fileBase64 = reader.result;
      setDocuments({ ...documents, [docType]: fileBase64 });
    };

    reader.readAsDataURL(file);
  };

  const handleProfilePicUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = () => {
        const fileBase64 = reader.result;
        setProfile({ ...profile, profilePic: fileBase64 });
      };

      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    // Save data to local storage
    localStorage.setItem("customerProfile", JSON.stringify(profile));
    localStorage.setItem("customerDocuments", JSON.stringify(documents));

    alert("Profile Updated Successfully!");
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      <h2>Customer Profile</h2>

      {/* Profile Picture Upload */}
      <div style={styles.profilePicContainer}>
        <img src={profile.profilePic || "https://via.placeholder.com/100"} alt="Profile" style={styles.profilePic} />
        <label htmlFor="profilePicUpload" style={styles.uploadButton}>
          <FaCamera /> Upload
        </label>
        <input type="file" id="profilePicUpload" accept="image/*" onChange={handleProfilePicUpload} style={{ display: "none" }} />
      </div>

      {/* Personal Information */}
      <h3>Personal Information</h3>
      <label>Full Name:</label>
      <input type="text" name="fullName" value={profile.fullName} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>Date of Birth:</label>
      <input type="date" name="dob" value={profile.dob} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>Phone:</label>
      <input type="text" name="phone" value={profile.phone} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>Email:</label>
      <input type="email" name="email" value={profile.email} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>Address:</label>
      <input type="text" name="address" value={profile.address} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      {/* KYC & Financial Information */}
      <h3>Identity & Financial Information</h3>
      <label>Aadhaar Card:</label>
      <input type="text" name="aadhaar" value={profile.aadhaar} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>PAN Card:</label>
      <input type="text" name="pan" value={profile.pan} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>Income:</label>
      <input type="text" name="income" value={profile.income} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      <label>Employment Status:</label>
      <select name="employment" value={profile.employment} onChange={handleInputChange} disabled={!isEditing} style={styles.input}>
        <option value="Employed">Employed</option>
        <option value="Self-Employed">Self-Employed</option>
        <option value="Freelancer">Freelancer</option>
      </select>

      <label>Credit Score:</label>
      <input type="text" name="creditScore" value={profile.creditScore} onChange={handleInputChange} disabled={!isEditing} style={styles.input} />

      {/* Document Upload */}
      <h3>Upload Documents</h3>
      <label>Salary Slip:</label>
      {documents.salarySlip && (
        <a href={documents.salarySlip} download="salarySlip.pdf" style={styles.downloadLink}>
          Download Salary Slip
        </a>
      )}
      <input type="file" onChange={(e) => handleFileUpload(e, "salarySlip")} style={styles.input} />

      <label>Bank Statement:</label>
      {documents.bankStatement && (
        <a href={documents.bankStatement} download="bankStatement.pdf" style={styles.downloadLink}>
          Download Bank Statement
        </a>
      )}
      <input type="file" onChange={(e) => handleFileUpload(e, "bankStatement")} style={styles.input} />

      <label>Aadhaar Card:</label>
      {documents.aadhaarCard && (
        <a href={documents.aadhaarCard} download="aadhaarCard.pdf" style={styles.downloadLink}>
          Download Aadhaar Card
        </a>
      )}
      <input type="file" onChange={(e) => handleFileUpload(e, "aadhaarCard")} style={styles.input} />

      <label>PAN Card:</label>
      {documents.panCard && (
        <a href={documents.panCard} download="panCard.pdf" style={styles.downloadLink}>
          Download PAN Card
        </a>
      )}
      <input type="file" onChange={(e) => handleFileUpload(e, "panCard")} style={styles.input} />

      {/* Security & Settings */}
      <h3>Security & Settings</h3>
      <button style={styles.securityButton}>
        <FaLock /> Change Password
      </button>

      <button style={styles.securityButton}>
        <FaKey /> Enable Two-Factor Authentication
      </button>

      {/* Edit & Save Button */}
      {!isEditing ? (
        <button onClick={() => setIsEditing(true)} style={styles.editButton}>
          <FaUserEdit /> Edit Profile
        </button>
      ) : (
        <button onClick={handleSave} style={styles.saveButton}>
          <FaSave /> Save Changes
        </button>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", width: "450px", margin: "auto", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
  input: { width: "100%", padding: "8px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" },
  uploadButton: { backgroundColor: "#007bff", color: "white", padding: "8px", cursor: "pointer", borderRadius: "5px", marginBottom: "10px" },
  saveButton: { backgroundColor: "#007bff", color: "white", padding: "10px", borderRadius: "5px", width: "100%", marginTop: "15px" },
  editButton: { backgroundColor: "#ffc107", color: "white", padding: "10px", borderRadius: "5px", width: "100%", marginTop: "15px" },
  securityButton: { backgroundColor: "#dc3545", color: "white", padding: "10px", borderRadius: "5px", width: "100%", marginTop: "10px" },
  profilePicContainer: { marginBottom: "20px" },
  profilePic: { width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", marginBottom: "10px" },
  downloadLink: { textDecoration: "none", color: "blue", marginBottom: "10px" },
};

export default CustomerProfile;
