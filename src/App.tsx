import React from "react";
import { Routes, Route, Link } from "react-router-dom";

// Reuse existing components from your app/ folder
import IndexRoute from "../app/routes/_index";
import HomeRoute from "../app/routes/home";
import Welcome from "../app/welcome/welcome";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple top nav so you can click around */}
      <nav className="p-4 flex gap-4 border-b border-gray-300 bg-gray-100">
        <Link className="text-blue-600 hover:underline" to="/">
          Index
        </Link>
        <Link className="text-blue-600 hover:underline" to="/home">
          Home
        </Link>
        <Link className="text-blue-600 hover:underline" to="/welcome">
          Welcome
        </Link>
      </nav>

      {/* Route outlet */}
      <div className="flex-1 p-4">
        <Routes>
          <Route path="/" element={<IndexRoute />} />
          <Route path="/home" element={<HomeRoute />} />
          <Route path="/welcome" element={<Welcome />} />
          {/* Add more routes here if you have them */}
        </Routes>
      </div>
    </div>
  );
}
