import React from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

// Reuse existing components from your app/ folder
import IndexRoute from "../app/routes/_index";
import HomeRoute from "../app/routes/home";
import Welcome from "../app/welcome/welcome";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Simple top nav so you can click around */}
      <nav className="p-4 flex gap-4 border-b border-gray-300 bg-gray-100">
        <Link className="text-blue-600 hover:underline" to="/">Portfolio</Link>
        <Link className="text-blue-600 hover:underline" to="/home">Home (old)</Link>
        <Link className="text-blue-600 hover:underline" to="/index">Index (template)</Link>
      </nav>

      <div className="flex-1">
        <Routes>
  <Route path="/" element={<Welcome />} />
  <Route path="/home" element={<HomeRoute />} />
  <Route path="/index" element={<IndexRoute />} />   {/* <-- this */}
  <Route path="/welcome" element={<Welcome />} />
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>
      </div>
    </div>
  );
}
