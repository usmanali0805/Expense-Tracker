import React, { useEffect, useState } from "react";
import { TrendingUpDown } from "lucide-react";
import CARD_2 from "../assets/images/Card2.jpeg";
import { Link , useNavigate} from "react-router-dom";
import { API_PATHS } from "../utils/apiPath"
import axiosInstance from "../utils/axiosInstance";

const Signup = () => {
  const [userdata, setUserdata] = useState({})
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();


  //  Input handlers
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit handler
  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, formData);
    console.log("Registered Successfully:", response.data);

    if (!localStorage.getItem("user")) {
  localStorage.setItem("token", JSON.stringify(response.data.token));
  localStorage.setItem("user", JSON.stringify(response.data.user));
}
else {
  console.error("Token or user missing in response");
}
navigate("/dashboard");

  } catch (error) {
    console.error("Registration Failed:", error.response?.data || error.message);
  }
};

  
console.log(userdata)

  return (
    <div className="flex w-full justify-between h-full gap-10 overflow-hidden">
      <div className="md:w-1/2 p-8 md:p-12">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Create an Account</h2>
          <p className="text-gray-600 mt-2">
            Join us today by entering your details below.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex gap-7 ">
            <div className="mb-6 w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-blue-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <div className="mb-8 w-full">
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-blue-50 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full bg-blue-50 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Create a password"
            />
            <p className="text-xs text-gray-500 mt-2">Minimum 8 characters</p>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-violet-500 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition shadow-md"
          >
            Create Account
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?
              <Link
                to={"/Login"}
                className="text-blue-600 font-medium hover:text-blue-800 transition"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>

      {/* Right Side */}
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
              {/* Main Card Section */}
              <div className="absolute p-[30px] flex h-[90%] flex-col items-center justify-between z-20 w-full max-w-[500px]">
                {/* Stat Card */}
                <div className="bg-white text-black rounded-lg p-2 flex items-center gap-5 w-full shadow-lg mb-6">
                  <span className="rounded-full flex w-fit h-fit justify-center items-center text-white p-2 bg-violet-600">
                    <TrendingUpDown />
                  </span>
                  <span>
                    <p className="text-[10px] ">Track Your Income & Expenses</p>
                    <h3 className="text-xl font-semibold mt-1">$430,000</h3>
                  </span>
                </div>
      
                {/* Graph Image */}
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

export default Signup;
