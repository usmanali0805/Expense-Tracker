import React from "react";
import { TrendingUp, ShoppingBag } from "lucide-react";

const ExpenceCard = ({ item }) => {
  const isPositive = item.price > 0;
  const bgColor = isPositive ? "bg-green-100" : "bg-red-100";
  const textColor = isPositive ? "text-green-600" : "text-red-600";
  const icon = <TrendingUp size={14} />;

  return (
    <div className="flex justify-between items-center w-full p-3 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3">
        <span className="bg-slate-100 p-2 rounded-full">
          <ShoppingBag />
        </span>
        <div>
          <h5 className="text-sm font-bold">{item.title}</h5>
          <p className="text-[12px] text-gray-500">{item.date}</p>
        </div>
      </div>

      <span
        className={`py-1 px-3 ${bgColor} ${textColor} font-semibold rounded-full flex items-center gap-1`}
      >
        <p>{item.price}</p>
        {icon}
      </span>
    </div>
  );
};

export default ExpenceCard;
