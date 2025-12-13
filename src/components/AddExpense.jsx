

import { useState } from "react";
import { addExpense } from "../api";

export default function AddExpense({ tripId, onAdd }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // ✅ Get token from localStorage
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("Please login first.");
  //       return;
  //     }
  //     console.log("Sending expense:", { tripId, title, amount, token });

  //     // ✅ Send API request
  //     const res = await addExpense({
  //       tripId,
  //       title,
  //       amount: Number(amount),
  //       //token,
  //     });

  //     // ✅ Update UI
  //     onAdd(res.data);
  //     setTitle("");
  //     setAmount("");
  //   } catch (err) {
  //     console.error("Error adding expense:", err);
  //     alert(err.response?.data?.message || "Failed to add expense");
  //   }
  // };


  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login first.");
      return;
    }

    // ⭐ Add this line
    setToken(token);

    const res = await addExpense({
      tripId,
      title,
      amount: Number(amount),
    });

    onAdd(res.data);
    setTitle("");
    setAmount("");
  } catch (err) {
    console.error("Error adding expense:", err);
    alert(err.response?.data?.message || "Failed to add expense");
  }
};

  

  return (
    <form
      onSubmit={handleSubmit}
      className="
        mt-2 
        flex flex-col sm:flex-row 
        gap-3 sm:gap-2
      "
    >
      {/* Expense Title */}
      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="
          w-full 
          bg-[#0b1220]/70 
          text-[#f9f7e8] 
          border border-[#d4af37]/40 
          rounded-xl 
          px-3 py-2 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#d4af37]/70
          placeholder:text-[#f9f7e8]/40
        "
        required
      />

      {/* Amount */}
      <input
        type="number"
        placeholder="Amount (₹)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="
          w-full sm:w-32 
          bg-[#0b1220]/70 
          text-[#f9f7e8] 
          border border-[#d4af37]/40 
          rounded-xl 
          px-3 py-2 
          text-sm 
          focus:outline-none 
          focus:ring-2 
          focus:ring-[#d4af37]/70
          placeholder:text-[#f9f7e8]/40
          [-moz-appearance:textfield]
          [&::-webkit-outer-spin-button]:appearance-none
          [&::-webkit-inner-spin-button]:appearance-none
        "
        required
      />

      {/* Submit Button */}
      <button
        type="submit"
        className="
          w-full sm:w-auto 
          bg-gradient-to-r from-[#d4af37] to-[#b8860b] 
          text-[#0f172a] 
          font-semibold 
          px-4 sm:px-5 
          py-2 
          rounded-xl 
          text-sm
          shadow-md 
          hover:shadow-lg 
          hover:from-[#e6c85c] hover:to-[#d4af37]
          transition-all 
          duration-200
        "
      >
        Add
      </button>
    </form>
  );
}
