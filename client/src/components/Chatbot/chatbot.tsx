import React, { useState } from "react";
import { FaRobot, FaPaperPlane, FaTimes } from "react-icons/fa";

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Click on a question or type your own!" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const faqData = [
    {
      question: "What types of loans do you offer?",
      answer:
        "We offer Home Loans, Vehicle Loans, Education Loans, Business Loans, and Personal Loans.",
    },
    {
      question: "How can I apply for a loan?",
      answer: "Go to the 'Apply for Loan' section in your dashboard.",
    },
    {
      question: "What is the minimum credit score required?",
      answer: "A credit score of at least 700 is recommended for approval.",
    },
    {
      question: "How do I check my loan status?",
      answer:
        "Go to the 'Loan Applications' section in your dashboard to track your application.",
    },
    {
      question: "How can I contact support?",
      answer:
        "You can email us at support@loanwebsite.com or call (555) 555-5555.",
    },
  ];

  const sendMessage = (text) => {
    if (!text.trim()) return;

    const userMessage = { sender: "user", text };
    setMessages((prev) => [...prev, userMessage]);

    setTimeout(() => {
      const responseText =
        faqData.find((faq) => faq.question === text)?.answer ||
        "I'm sorry, I don't have an answer for that.";
      setMessages((prev) => [...prev, { sender: "bot", text: responseText }]);
    }, 800);

    setInput("");
  };

  return (
    <div>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-lg"
        >
          <FaRobot size={24} />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-80 bg-white shadow-xl rounded-lg border border-gray-300">
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
            <span>FAQ ChatBot</span>
            <button onClick={() => setIsOpen(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="p-3 h-60 overflow-y-auto">
            {/* FAQ Questions */}
            <div className="mb-4">
              <p className="font-bold text-gray-800">Click a question:</p>
              {faqData.map((faq, index) => (
                <button
                  key={index}
                  onClick={() => sendMessage(faq.question)}
                  className="block bg-gray-200 text-black p-2 mt-1 rounded text-left w-full hover:bg-gray-300"
                >
                  {faq.question}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`mb-2 ${
                  msg.sender === "user" ? "text-right" : "text-left"
                }`}
              >
                <span
                  className={`inline-block p-2 rounded ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.text}
                </span>
              </div>
            ))}
          </div>

          {/* User Input */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              className="flex-1 p-2 border rounded"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage(input)}
            />
            <button
              onClick={() => sendMessage(input)}
              className="bg-blue-600 text-white p-2 ml-2 rounded"
            >
              <FaPaperPlane />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
