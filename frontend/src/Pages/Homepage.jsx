import React from "react";
import { Link  } from "react-router-dom";
import Sidebar from "../assets/components/Sidebar";
import Navbar from "../assets/components/Navbar";
import Card from "../assets/components/Card";
import { CreditCard ,Wallet ,HandCoins, ArrowRight } from 'lucide-react';
import  items  from "../assets/items";
import ExpenceCard from "../assets/components/ExpenceCard";
import { useState,useEffect} from "react";


const Homepage = () => {
  const [itemscard, setItemscard] = useState(items)
  useEffect(() => {
  const token = localStorage.getItem("token");
  // if (!token) navigate("/login");
}, []);

localStorage.getItem("token")
localStorage.getItem("user")


  return (
    <>
      <Navbar />
      <div className="w-full h-full flex items-center justify-between">
        <Sidebar/>
        <section className="h-full w-full flex flex-col gap-10 p-5">
        <header className="flex gap-5" >
          <Card icon={<CreditCard/>} text={"Total Balance"} price={79100} color={"bg-violet-600"}/>
          <Card icon={<Wallet />} text={"Total Income"} price={86200} color={"bg-orange-500"}/>
          <Card icon={<HandCoins/>} text={"Total Expence"} price={7100} color={"bg-red-600"}/>
        </header>
        <main className="flex w-full">
          {/* Recent Transaction */}
          <div className="flex flex-col gap-3 p-3 shadow-md w-[50%] h-full">
            <div className="p-3 flex justify-between items-center">
              <h2 className="font-semibold">Recent Transactions</h2>
              <button className="flex gap-3 bg-slate-200 rounded-[12px] items-center py-2 px-5">
                <p className="font-semibold text-[12px]">See All</p>
                <ArrowRight size={16}/>
              </button>
            </div>
            <div className="flex flex-col">
              {items.map((item)=>
              <ExpenceCard item={item}/>
              )}
            </div>
          </div>
          {/* Income */}
          <div className="flex flex-col gap-3 p-3 shadow-md w-[50%] h-full">
            <div className="p-3 flex justify-between items-center">
              <h2 className="font-semibold">Income</h2>
              <button className="flex gap-3 bg-slate-200 rounded-[12px] items-center py-2 px-5">
                <p className="font-semibold text-[12px]">See All</p>
                <ArrowRight size={16}/>
              </button>
            </div>
            <div className="flex flex-col">
              {items.map((item)=>
              <ExpenceCard item={item}/>
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
