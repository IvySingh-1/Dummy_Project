import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

const Home = () => {
    const [userData, setUserData] = useState({
      Email:"",
      name:"",
      ExpenseScore:0
    });
  
    useEffect(() => {
      
      const token = Cookies.get('token'); 
      if (token) {
        try {
          
          const {Email,name,ExpenseScore} = jwtDecode(token);
          setUserData({Email,name,ExpenseScore}); 
          console.log(Email)
        } catch (error) {
          console.error("Invalid token:", error);
        }
      } else {
        console.log("No token found in cookies.");
      }
    }, []);
    const handleLogout = () => {
  
      Cookies.remove("token");
    
      window.location.href = "/login";
    };
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Expense Tracker</h1>
      {userData && userData.Email ? <p>HI {userData.name}</p>:""}
      <nav className="mb-6">
        
      {userData && userData.Email ? <button onClick={handleLogout}>Logout</button>:<Link to="/login" className="mr-4 text-blue-500">Login</Link>}
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
