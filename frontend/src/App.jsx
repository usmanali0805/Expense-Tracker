import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Navbar from "./assets/components/Navbar"; 
import Signup from "./Pages/Signup"; 
import Homepage from "./Pages/Homepage"; 
import Income from "./Pages/Income"; 
import Expence from "./Pages/Expence";
import Layout from "./Layout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="income" element={<Income />} />
          <Route path="expence" element={<Expence />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
      </Routes>
    </div>
  );
}

export default App;
