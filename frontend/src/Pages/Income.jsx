import React, { useState, useEffect } from "react";
import { Wallet, TrendingUp, PlusCircle } from "lucide-react";
import Sidebar from "../assets/components/Sidebar";
import { API_PATHS } from "../utils/apiPath";
import axiosInstance from "../utils/axiosinstance";

const Income = () => {
  const [incomes, setIncomes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newIncome, setNewIncome] = useState({});

    const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);
      setIncomes(response.data.incomes || []);
    } catch (error) {
      console.error("Error fetching incomes:", error);
    } finally {
    }
  };
  // useEffect(() => {
  //   fetchIncomes();
  // }, []);

  // Add new income (POST request)
  const handleAddIncomeValue = async () => {
    if (!newIncome.title || !newIncome.date || !newIncome.price) {
      alert("Please fill all fields");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "http://localhost:5000/api/income/create",
        {
          title: newIncome.title,
          amount: newIncome.price,
          date: newIncome.date,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Income Added:", response.data);

      // Update frontend immediately
      setIncomes((prev) => [...prev, response.data.income]);
      setNewIncome({ title: "", date: "", price: "" });
      setShowForm(false);
    } catch (error) {
      console.error("Error adding income:", error.message);
    }
  };

  // Calculate total income
  const totalIncome = incomes.reduce(
    (acc, item) => acc + Number(item.price || item.amount || 0),
    0
  );

  return (
    <div className="flex w-full h-full">
      <div className="w-full min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
        {/* Header */}
        <div className="w-full max-w-3xl flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-orange-600">
              <TrendingUp size={24} /> Income Overview
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Total Income:{" "}
              <span className="text-orange-600 font-semibold">
                Rs. {totalIncome}
              </span>
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all"
          >
            <PlusCircle size={18} /> Add Income
          </button>
        </div>

        {/* Add Income Form */}
        {showForm && (
          <div className="w-full max-w-3xl bg-white p-5 rounded-lg shadow-md mb-6">
            <div className="grid grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Title"
                value={newIncome.title}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, title: e.target.value })
                }
                className="border p-2 rounded-lg focus:outline-orange-500"
              />
              <input
                type="date"
                value={newIncome.date}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, date: e.target.value })
                }
                className="border p-2 rounded-lg focus:outline-orange-500"
              />
              <input
                type="number"
                placeholder="Amount"
                value={newIncome.price}
                onChange={(e) =>
                  setNewIncome({ ...newIncome, price: e.target.value })
                }
                className="border p-2 rounded-lg focus:outline-orange-500"
              />
            </div>

            <button
              onClick={handleAddIncomeValue}
              className="mt-4 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-all"
            >
              Add
            </button>
          </div>
        )}

        {/* Income List */}
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-4">
          {incomes.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No incomes found.</p>
          ) : (
            incomes.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center w-full p-3 border-b last:border-none hover:bg-gray-50 transition-all duration-200"
              >
                <div className="flex items-center gap-3">
                  <span className="bg-orange-100 p-2 rounded-full text-orange-600">
                    <Wallet size={18} />
                  </span>
                  <div>
                    <h5 className="text-sm font-bold">{item.title}</h5>
                    <p className="text-[12px] text-gray-500">
                      {item.date?.slice(0, 10)}
                    </p>
                  </div>
                </div>
                <span className="py-1 px-3 bg-green-100 text-green-600 font-semibold rounded-[10px] flex items-center gap-1">
                  + Rs. {item.price || item.amount}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Income;
