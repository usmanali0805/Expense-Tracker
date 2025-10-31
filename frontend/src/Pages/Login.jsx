import React, { useState } from "react";
import CARD_2 from "../assets/images/Card2.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { Eye, TrendingUpDown } from "lucide-react";
import axiosInstance from "../utils/axiosinstance";
import { API_PATHS } from "../utils/apiPath";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, formData);
      localStorage.setItem("token", JSON.stringify(response.data.token));
      localStorage.setItem("user", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Login Failed:", error.response?.data || error.message);
    }
    navigate("/");
  };
  localStorage.getItem("token")
localStorage.getItem("user")


  return (
    <div className="flex w-full justify-between h-full gap-10 overflow-hidden">
      <section className="w-[55%]">
        <div className="h-full w-full flex relative flex-col items-center justify-center bg-white px-4">
          <h2 className="text-xl absolute top-0 left-0 p-5 font-semibold text-gray-900 mb-10">
            Expense Tracker
          </h2>

          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Welcome Back
            </h3>
            <p className="text-sm text-gray-500 mb-6">
              Please enter your details to log in
            </p>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email Address
                </label>
                <input
                  onChange={handleChange}
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    onChange={handleChange}
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    placeholder="Min 8 Characters"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                  />
                  <span className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer">
                    <Eye />
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-lg hover:opacity-90 transition-all duration-300"
              >
                LOGIN
              </button>
            </form>

            <p className="text-sm text-gray-600 text-center mt-6">
              Don't have an account?
              <Link
                to="/signup"
                className="text-violet-600 font-medium hover:underline"
              >
                SignUp
              </Link>
            </p>
          </div>
        </div>
      </section>
      <section className="min-h-screen w-[40%] bg-slate-100 flex flex-col items-center justify-center  relative overflow-hidden">
        <span className="w-full h-[30%] flex justify-start items-start">
          <div className="w-[140px] h-[140px] bg-violet-600 rounded-br-[50px]"></div>
        </span>
        <span className="w-full h-[40%] flex justify-end items-center ">
          <div className="w-[160px] h-[160px] border-[#c011fd] border-[15px] rounded-[30px] mr-[30px]"></div>
        </span>
        <span className="w-full h-[30%] flex justify-between items-end">
          <div className="w-[140px] h-[140px] bg-violet-600 rounded-tr-[70%]"></div>
        </span>
        <div className="absolute p-[30px] flex h-[90%] flex-col items-center justify-between z-20 w-full max-w-[500px]">
          <div className="bg-white text-black rounded-lg p-2 flex items-center gap-5 w-full shadow-lg mb-6">
            <span className="rounded-full flex w-fit h-fit justify-center items-center text-white p-2 bg-violet-600">
              <TrendingUpDown />
            </span>
            <span>
              <p className="text-[10px] ">Track Your Income & Expenses</p>
              <h3 className="text-xl font-semibold mt-1">$430,000</h3>
            </span>
          </div>

          <img
            src={CARD_2}
            alt="Transactions Graph"
            className="w-[90%] mx-auto rounded-2xl shadow-lg"
          />
        </div>
      </section>
    </div>
  );
};

export default Login;
