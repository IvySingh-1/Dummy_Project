import React from "react";
import Login from "../components/Login";

const LoginPage = () => {
  const handleLogin = (userData) => {
    // Handle successful login (store user data, redirect, etc.)
    console.log("Logged in user:", userData);
    // Example: redirect to dashboard or handle state as needed
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
