import React from "react";
import Register from "../components/Register";

const RegisterPage = () => {
  const handleRegister = (userData) => {
    // Handle successful registration (store user data, redirect, etc.)
    console.log("Registered user:", userData);
    // Example: redirect to login or dashboard
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <Register onRegister={handleRegister} />
    </div>
  );
};

export default RegisterPage;
