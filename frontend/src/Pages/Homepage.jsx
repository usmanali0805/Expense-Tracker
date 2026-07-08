import React from "react";
import { Link } from "react-router-dom";
import Sidebar from "../assets/components/Sidebar";
import Navbar from "../assets/components/Navbar";
import Card from "../assets/components/Card";
import { CreditCard, Wallet, HandCoins, ArrowRight } from "lucide-react";
import items from "../assets/items";
import ExpenceCard from "../assets/components/ExpenceCard";
import { useState, useEffect } from "react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

const Homepage = () => {
  const [itemscard, setItemscard] = useState(items);
  const [transections, setTransections] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);

  const Transaction = async () => {
    try {
      const [incomeres, expenseres] = await Promise.all([
        axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME),
        axiosInstance.get(API_PATHS.EXPENSE.GET_ALL_EXPENSE),
      ]);
      const incomedata = incomeres?.data.incomes;
      const expensedata = expenseres?.data.expenses;
      setExpenses(expensedata);
      const income = incomedata.map((income) => ({
        ...income,
        type: "income",
      }));
      const expense = expensedata.map((expense) => ({
        ...expense,
        type: "expence",
      }));
      setIncomes(income);

      const merge = [...income, ...expense];
      // (a, b) => new Date(b.date) - new Date(a.date)
      merge.sort((a, b) => new Date(b.date) - new Date(a.date));
      if (merge) {
        setTransections(merge);
        console.log(merge & transections)
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    Transaction()
  }, []);

  const totalIncome = incomes.reduce(
    (acc, item) => acc + Number(item.price || item.amount || 0),
    0,
  );
  const totalExpense = expenses.reduce(
    (acc, item) => acc + Number(item.amount),
    0,
  );

  return (
    <>
      <Navbar />
      <div className="w-full h-full flex items-center justify-between">
        <section className="h-full w-full flex flex-col gap-10 p-5">
          <header className="flex gap-5">
            <Card
              icon={<CreditCard />}
              text={"Total Balance"}
              price={totalIncome - totalExpense}
              color={"bg-violet-600"}
            />
            <Card
              icon={<Wallet />}
              text={"Total Income"}
              price={totalIncome}
              color={"bg-orange-500"}
            />
            <Card
              icon={<HandCoins />}
              text={"Total Expence"}
              price={totalExpense}
              color={"bg-red-600"}
            />
          </header>
          <main className="flex w-full">
            {/* Recent Transaction */}
            <div className="flex flex-col gap-3 p-3 shadow-md w-[50%] h-full">
              <div className="p-3 flex justify-between items-center">
                <h2 className="font-semibold">Recent Transactions</h2>
                {/* <button className="flex gap-3 bg-slate-200 rounded-[12px] items-center py-2 px-5">
                  <p className="font-semibold text-[12px]">See All</p>
                  <ArrowRight size={16} />
                </button> */}
              </div>
              <div className="flex flex-col">
                {transections.slice(0,5).map(
                  (item) =>
                    <ExpenceCard key={item._id} item={item} />,
                )}
              </div>
            </div>
            {/* Income */}
            <div className="flex flex-col gap-3 p-3 shadow-md w-[50%] h-full">
              <div className="p-3 flex justify-between items-center">
                <h2 className="font-semibold">Income</h2>
                <Link className="cursor-pointer" to={"/Income"}>
                  <button className="flex cursor-pointer gap-3 bg-slate-200 rounded-[12px] items-center py-2 px-5">
                    <p className="font-semibold text-[12px]">See All</p>
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
              <div className="flex flex-col">
                {incomes.slice(0 ,5).map(
                  (item) => <ExpenceCard key={item._id} item={item} />,
                )}
              </div>
            </div>
          </main>
        </section>
      </div>
    </>
  );
};

export default Homepage;
