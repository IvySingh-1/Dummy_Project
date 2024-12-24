import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./Home.css"
import snowflakes from "../assets/snowflakes.png";
import tree from "../assets/tree.png";

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
    <div className="container1 p-4">

<img className="tree" src={tree} alt=""/>

      <img className="sf1" src={snowflakes} alt="" />
            <img className="sf sf2" src={snowflakes} alt="" />
            <img className="sf sf3" src={snowflakes} alt="" />
            <img className="sf sf4" src={snowflakes} alt="" />
      <h1>Welcome to Your</h1>
      <h1 id="name">Expense Tracker
      </h1>
      {userData && userData.Email ? <p>HI {userData.name}</p> : ""}
      <nav className="mb-6">
        {userData && userData.Email ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <Link to="/login" className="btn1 btn m-9">
            Login
          </Link>
        )}
        <Link to="/register" className="btn1 btn text-blue-500">
          Register
        </Link>
      </nav>

      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default Home;
