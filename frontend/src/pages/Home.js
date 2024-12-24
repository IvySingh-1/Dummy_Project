import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const Home = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Expense Tracker</h1>
      <nav className="mb-6">
        <Link to="/login" className="mr-4 text-blue-500">Login</Link>
        <Link to="/register" className="text-blue-500">Register</Link>
      </nav>

      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default Home;
