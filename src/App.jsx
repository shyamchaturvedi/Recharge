
// App.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const discounts = [10, 50, 100, 200, 500];

function getRandomDiscount() {
  return discounts[Math.floor(Math.random() * discounts.length)];
}

export default function App() {
  const [spun, setSpun] = useState(false);
  const [discount, setDiscount] = useState(null);
  const [shared, setShared] = useState(false);
  const [coupon, setCoupon] = useState(0);
  const [form, setForm] = useState({ number: "", operator: "", plan: 0 });
  const [paymentStarted, setPaymentStarted] = useState(false);
  const [transactionId, setTransactionId] = useState(null);

  const handleSpin = () => {
    const value = getRandomDiscount();
    setDiscount(value);
    setSpun(true);
  };

  const handleShare = () => {
    setShared(true);
    setCoupon(discount);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayment = () => {
    setPaymentStarted(true);
    const upiLink = `upi://pay?pa=9598023701@ypl&pn=Mobile+Recharge&am=${form.plan - coupon}&cu=INR`;
    window.location.href = upiLink;
    setTimeout(() => {
      const fakeTxnId = "TXN" + Math.floor(Math.random() * 1000000000);
      setTransactionId(fakeTxnId);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-500 to-yellow-400 text-white flex flex-col items-center justify-center p-4 space-y-6">
      <h1 className="text-4xl font-bold drop-shadow-md">Mobile Recharge Lucky Spin</h1>

      {!spun ? (
        <motion.button
          whileTap={{ scale: 0.9 }}
          className="bg-white text-purple-800 px-6 py-3 rounded-2xl font-semibold shadow-lg"
          onClick={handleSpin}
        >
          Spin the Wheel
        </motion.button>
      ) : !shared ? (
        <div className="text-center">
          <p className="text-2xl">Congratulations! You won ₹{discount} OFF</p>
          <p className="text-md mt-2">Share with a friend to unlock coupon code.</p>
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-green-500 px-4 py-2 mt-3 rounded-xl"
            onClick={handleShare}
          >
            Share Now
          </motion.button>
        </div>
      ) : transactionId ? (
        <div className="bg-white text-purple-800 p-6 rounded-2xl text-center shadow-xl">
          <h2 className="text-2xl font-bold">Recharge Done!</h2>
          <p className="mt-2">Transaction ID: {transactionId}</p>
          <p className="mt-1">Thank you for using our service!</p>
        </div>
      ) : paymentStarted ? (
        <p className="text-xl animate-pulse">Waiting for payment confirmation...</p>
      ) : (
        <div className="bg-white text-purple-800 p-6 rounded-2xl w-full max-w-md space-y-4 shadow-xl">
          <h2 className="text-2xl font-bold">Recharge Form</h2>

          <input
            type="text"
            name="number"
            placeholder="Mobile Number"
            className="w-full p-2 rounded-xl border"
            onChange={handleFormChange}
          />
          <input
            type="text"
            name="operator"
            placeholder="Operator (e.g., Jio, Airtel)"
            className="w-full p-2 rounded-xl border"
            onChange={handleFormChange}
          />
          <input
            type="number"
            name="plan"
            placeholder="Recharge Amount"
            className="w-full p-2 rounded-xl border"
            onChange={handleFormChange}
          />

          <div className="text-md">
            Apply Coupon: <span className="font-bold">OFF{coupon}</span>
            <br />Final Amount: ₹{form.plan - coupon || 0}
          </div>

          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-purple-600 text-white w-full p-2 rounded-xl"
            onClick={handlePayment}
          >
            Pay Now
          </motion.button>
        </div>
      )}
    </div>
  );
}
