import React, { useEffect, useState,  createContext, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import {atom,useRecoilState} from "recoil"
import { useUserContext } from "./../components/context/userContext";
const charAtom = atom({
  key:"userState",
  default: { Email: "", name: "", ExpenseScore: 0 },
})

const Home = () => {
  const { userDetails, setLoading } = useUserContext();
  
    const handleLogout = () => {
  
      Cookies.remove("token");
    setLoading(false);
      window.location.href = "/login";
    };
    useEffect(() => {
      if(!userDetails){
        console.log({userDetails})
        // window.location.href = "/login";
      }
    },[userDetails]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Expense Tracker</h1>
      {userDetails && userDetails.Email ? <p>HI {userDetails.name}</p>:""}
      <nav className="mb-6">
        
      {userDetails && userDetails.Email ? <button onClick={handleLogout}>Logout</button>:<Link to="/login" className="mr-4 text-blue-500">Login</Link>}
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
