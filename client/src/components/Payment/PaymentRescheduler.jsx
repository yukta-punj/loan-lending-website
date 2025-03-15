import React, { useState } from "react";

const PaymentRescheduler = () => {
  const [formData, setFormData] = useState({
    billOrganizer: "",
    name: "",
    contactNumber: "",
    homeOffice: "",
    address: "",
    payments: Array(6).fill({
      billReceivedOn: "",
      dueDate: "",
      lateFee: "",
      billFor: "",
      billingMonth: "",
      totalMonth: "",
      paidBy: "",
      paymentDate: "",
    }),
  });

  const [totalAmount, setTotalAmount] = useState(0);

  // Handle input changes
  const handleInputChange = (index, field, value) => {
    const updatedPayments = [...formData.payments];
    updatedPayments[index] = { ...updatedPayments[index], [field]: value };

    setFormData({ ...formData, payments: updatedPayments });
  };

  // Calculate total amount paid
  const calculateTotal = () => {
    const total = formData.payments.reduce((sum, item) => {
      return sum + (parseFloat(item.totalMonth) || 0);
    }, 0);
    setTotalAmount(total);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      <h1 className="text-center text-2xl font-bold text-gray-800 mb-4">Payment Rescheduler</h1>

      {/* Form Fields */}
      <div className="mb-4">
        <label className="block text-gray-700">Bill Organizer for:</label>
        <input
          type="text"
          value={formData.billOrganizer}
          onChange={(e) => setFormData({ ...formData, billOrganizer: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Enter Text Here"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Name:</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Mr. John Smith"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Contact Number:</label>
        <input
          type="text"
          value={formData.contactNumber}
          onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="(555) 555-5555"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Home/Office:</label>
        <input
          type="text"
          value={formData.homeOffice}
          onChange={(e) => setFormData({ ...formData, homeOffice: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Home"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Address:</label>
        <input
          type="text"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="H-106 Tech Town, East Ivy"
        />
      </div>

      {/* Payment Table */}
      <table className="w-full border-collapse border border-gray-300 mt-4">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Bill Received On</th>
            <th className="border border-gray-300 p-2">Due Date</th>
            <th className="border border-gray-300 p-2">Late Fee</th>
            <th className="border border-gray-300 p-2">Bill For</th>
            <th className="border border-gray-300 p-2">Billing Month</th>
            <th className="border border-gray-300 p-2">Total Month</th>
            <th className="border border-gray-300 p-2">Paid By</th>
            <th className="border border-gray-300 p-2">Payment Date</th>
          </tr>
        </thead>
        <tbody>
          {formData.payments.map((payment, index) => (
            <tr key={index}>
              <td className="border border-gray-300 p-2">
                <input
                  type="date"
                  value={payment.billReceivedOn}
                  onChange={(e) => handleInputChange(index, "billReceivedOn", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="date"
                  value={payment.dueDate}
                  onChange={(e) => handleInputChange(index, "dueDate", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={payment.lateFee}
                  onChange={(e) => handleInputChange(index, "lateFee", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={payment.billFor}
                  onChange={(e) => handleInputChange(index, "billFor", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={payment.billingMonth}
                  onChange={(e) => handleInputChange(index, "billingMonth", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={payment.totalMonth}
                  onChange={(e) => handleInputChange(index, "totalMonth", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="text"
                  value={payment.paidBy}
                  onChange={(e) => handleInputChange(index, "paidBy", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
              <td className="border border-gray-300 p-2">
                <input
                  type="date"
                  value={payment.paymentDate}
                  onChange={(e) => handleInputChange(index, "paymentDate", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total Calculation Button */}
      <div className="text-center mt-4">
        <button
          onClick={calculateTotal}
          className="bg-green-500 text-white p-2 rounded"
        >
          Calculate Total
        </button>
        <p className="mt-2 text-lg font-bold">Total Amount Paid: Rs.{totalAmount.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PaymentRescheduler;
