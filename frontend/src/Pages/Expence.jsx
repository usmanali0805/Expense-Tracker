import React, { useState, useEffect } from "react";
import { CreditCard, TrendingDown, PlusCircle, EthernetPort, Trash2 } from "lucide-react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

const Expense = () => {
  const [expenses, setExpenses] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: "",
    date: "",
    price: "",
  });

    const fetchExpense = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE);
      const {data} = response
      setExpenses(data.expenses || []);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    } 
  };
  useEffect(() => {
    fetchExpense();
  }, []);

  // Add new income (POST request)
  const handleAddExpenseValue = async () => {
    if (!newExpense.title || !newExpense.date || !newExpense.price) {
      alert("Please fill all fields");
      return;
    }
    console.log(newExpense.title , newExpense.date , newExpense.price)

    const {id}  = JSON.parse(localStorage.getItem("user"))
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "http://localhost:5000/api/v1/expense/add",
        {
          userId : id,
          icon: newExpense.title,
          amount: newExpense.price,
          date: newExpense.date,
          category: 'Expense'

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Income Added:", response.data);

      // Update frontend immediately
      setExpenses((prev) => [...prev, response.data.income]);
      setNewExpense({ title: "", date: "", price: "" });
      setShowForm(false);
      fetchExpense()
    } catch (error) {
      console.error("Error adding income:", error.message);
    }
  };

  const HandleDeleteExpense = async (id) =>{
    const isConfirmed = window.confirm("Do you want to delete this Expense");
    if(!isConfirmed) return !isConfirmed;
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setExpenses((prev)=> prev.filter((item)=>(item._id !== id)))
    } catch (error) {
      console.error(error.message)
    }
  }
  const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

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
              Total Expense:{" "}
              <span className="text-red-600 font-semibold">
                Rs. {totalExpense}
              </span>
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
                onChange={(e) =>
                  setNewExpense({ ...newExpense, title: e.target.value })
                }
                className="border p-2 rounded-lg focus:outline-red-500"
              />
              <input
                type="date"
                value={newExpense.date}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, date: e.target.value })
                }
                className="border p-2 rounded-lg focus:outline-red-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newExpense.price}
                onChange={(e) =>
                  setNewExpense({ ...newExpense, price: e.target.value })
                }
                className="border p-2 rounded-lg focus:outline-red-500"
              />
            </div>
            <button
              onClick={handleAddExpenseValue}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all"
            >
              Add
            </button>
          </div>
        )}

        {/* Expense List */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          {expenses.map((item, index) => (
            <div
              key={index}
              className="group flex justify-between items-center w-full p-3 border-b last:border-none hover:bg-gray-50 transition-all duration-200"
            >
              <div className="flex items-center gap-3">
                <span className="bg-red-100 p-2 rounded-full text-red-600">
                  <CreditCard size={18} />
                </span>
                <div>
                  <h5 className="text-sm font-bold">{item.icon}</h5>
                  <p className="text-[12px] text-gray-500">{item?.date.slice(0 ,10)}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="py-1 px-3 bg-red-100 text-red-600 font-semibold rounded-[10px] flex items-center gap-1">
                  - Rs. {item.amount}
                </span>

                {/* Delete button - abhi sirf UI, functionality baad mein */}
                <button 
                onClick={HandleDeleteExpense}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 rounded-full text-gray-400 hover:bg-red-100 hover:text-red-600"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Expense;
