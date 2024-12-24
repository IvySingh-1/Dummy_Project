import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

import Login from "./../components/Auth/Login";

const LoginPage = () => {
  const [userData, setUserData] = useState({
    Email:"",
    name:"",
    ExpenseScore:0
  });

  useEffect(() => {
    
    const token = Cookies.get("token"); 
    if (token) {
      try {
        
        const {Email,name,ExpenseScore} = jwtDecode(token);
        setUserData({Email,name,ExpenseScore}); 
        
      } catch (error) {
        console.error("Invalid token:", error);
      }
    } else {
      console.log("No token found in cookies.");
    }
  }, []);
  const handleLogin = (userData) => {
    console.log("Logged in user:", userData);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <Login onLogin={handleLogin} />
    </div>
  );
};

export default LoginPage;
