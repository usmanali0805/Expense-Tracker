import React, { useState , useEffect } from "react";
import { CreditCard, TrendingDown, PlusCircle } from "lucide-react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

const Expense = () => {
    const [expenses, setExpenses] = useState([])
  const [expenseData, setExpenseData] = useState([
    { title: "Shopping", date: "2025-10-28", price: 12000 },
    { title: "Travel", date: "2025-10-25", price: 5000 },
    { title: "Groceries", date: "2025-10-22", price: 8900 },
    { title: "Electricity Bill", date: "2025-10-20", price: 6500 },
    { title: "Loan Repayment", date: "2025-10-18", price: 7400 },
  ]);

    useEffect(() => {
    // fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );
      setExpenses(response.data.expenses || []);
    } catch (error) {
      console.error("Error fetching expenses:", error);
    } finally {
      setLoading(false);
    }
    console.log(expenses)
  };

  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({ title: "", date: "", price: "" });

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.date && newExpense.price) {
      setExpenseData([...expenseData, newExpense]);
      setNewExpense({ title: "", date: "", price: "" });
      setShowForm(false);
    }
  };

  const totalExpense = expenseData.reduce((acc, item) => acc + Number(item.price), 0);

  return (
    <div className="flex w-full h-full">
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-3xl flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-red-600">
              <TrendingDown size={24} /> Expense Overview
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Total Expense: <span className="text-red-600 font-semibold">Rs. {totalExpense}</span>
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
          >
            <PlusCircle size={18} /> Add Expense
          </button>
        </div>

        {/* Add Expense Form */}
        {showForm && (
          <div className="w-full max-w-3xl bg-white p-5 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Title"
                value={newExpense.title}
                onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                className="border p-2 rounded-lg focus:outline-red-500"
              />
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                className="border p-2 rounded-lg focus:outline-red-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.price}
                onChange={(e) => setNewExpense({ ...newExpense, price: e.target.value })}
                className="border p-2 rounded-lg focus:outline-red-500"
              />
            </div>
            <button
              onClick={handleAddExpense}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Add
            </button>
          </div>
        )}

        {/* Expense List */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          {expenseData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center w-full p-3 border-b last:border-none hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="bg-red-100 p-2 rounded-full text-red-600">
                  <CreditCard size={18} />
                </span>
                <div>
                  <h5 className="text-sm font-bold">{item.title}</h5>
                  <p className="text-[12px] text-gray-500">{item.date}</p>
                </div>
              </div>
              <span className="py-1 px-3 bg-red-100 text-red-600 font-semibold rounded-[10px] flex items-center gap-1">
                - Rs. {item.price}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expense;
