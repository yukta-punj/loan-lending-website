import React, { useState } from "react";
import { FaCreditCard, FaChartLine } from "react-icons/fa";

const CibilScore = () => {
  const [pan, setPan] = useState("");
  const [cibilScore, setCibilScore] = useState(null);
  const [status, setStatus] = useState("");

  const checkCibilScore = () => {
    if (pan.length !== 10) {
      alert("Please enter a valid 10-character PAN Number.");
      return;
    }

    // Generate a fake CIBIL score for demo purposes
    const randomScore = Math.floor(Math.random() * (900 - 300 + 1)) + 300;

    setCibilScore(randomScore);

    if (randomScore >= 750) {
      setStatus("Excellent ✅");
    } else if (randomScore >= 650) {
      setStatus("Good 👍");
    } else if (randomScore >= 550) {
      setStatus("Average ⚠️");
    } else {
      setStatus("Poor ❌");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}><FaChartLine /> Check Your CIBIL Score</h2>

      <label style={styles.label}>Enter PAN Card Number:</label>
      <input
        type="text"
        placeholder="ABCDE1234F"
        value={pan}
        onChange={(e) => setPan(e.target.value.toUpperCase())}
        maxLength={10}
        style={styles.input}
      />

      <button onClick={checkCibilScore} style={styles.button}>
        <FaCreditCard /> Check Score
      </button>

      {cibilScore !== null && (
        <div style={styles.result}>
          <h3>Your CIBIL Score: <span style={{ color: "blue" }}>{cibilScore}</span></h3>
          <h3>Status: <span>{status}</span></h3>
        </div>
      )}
    </div>
  );
};

// Styles
const styles = {
  container: { textAlign: "center", padding: "20px", backgroundColor: "#fff", borderRadius: "8px", width: "400px", margin: "auto", boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)" },
  heading: { fontSize: "22px", marginBottom: "15px", color: "#007bff" },
  label: { fontSize: "16px", display: "block", marginBottom: "8px" },
  input: { width: "100%", padding: "10px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" },
  button: { backgroundColor: "#28a745", color: "white", padding: "10px 15px", borderRadius: "5px", cursor: "pointer", border: "none" },
  result: { marginTop: "20px", fontSize: "18px", fontWeight: "bold" }
};

export default CibilScore;
