// Layout.jsx
import { Outlet } from "react-router-dom";
import Sidebar from "./assets/components/Sidebar";
import React from "react";

export default function Layout() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
}
