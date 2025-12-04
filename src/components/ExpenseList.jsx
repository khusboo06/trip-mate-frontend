

import { useEffect, useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export default function ExpenseList({ tripId, token, expenses: parentExpenses }) {
  const [expenses, setExpenses] = useState(parentExpenses || []);
  const [loading, setLoading] = useState(
    !parentExpenses || parentExpenses.length === 0
  );

  useEffect(() => {
    
    if (parentExpenses && parentExpenses.length > 0) {
      setExpenses(parentExpenses);
      setLoading(false);
      return;
    }

    if (!tripId) return;

    const fetchExpenses = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/expenses/${tripId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setExpenses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, [tripId, token, parentExpenses]);

  
  useEffect(() => {
    if (parentExpenses) setExpenses(parentExpenses);
  }, [parentExpenses]);

  if (loading)
    return <p className="text-gray-400 mt-2 text-sm">Loading expenses...</p>;
  if (expenses.length === 0)
    return <p className="text-gray-400 mt-2 text-sm">No expenses yet.</p>;

  return (
    <div className="mt-4">
      <h2 className="text-lg font-semibold mb-3 text-[#f9f7e8]">
        Expenses
      </h2>
      <div className="space-y-2">
        {expenses.map((e) => (
          <div
            key={e._id || `${e.title}-${e.amount}-${Math.random()}`}
            className="
              flex justify-between items-center 
              px-3 py-2 
              rounded-xl 
              bg-[#020617]/60 
              border border-[#d4af37]/20 
              text-[#f9f7e8] 
              text-sm
            "
          >
            <span className="truncate max-w-[60%]">{e.title}</span>
            <span className="font-semibold">₹ {e.amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
