import React, { useEffect, useState,  createContext, useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

import "./Home.css"
import snowflakes from "../assets/snowflakes.png";
import tree from "../assets/tree.png";

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

    <div className="container1 p-4">

      <img className="tree" src={tree} alt=""/>

      <img className="sf1" src={snowflakes} alt="" />
            <img className="sf sf2" src={snowflakes} alt="" />
            <img className="sf sf3" src={snowflakes} alt="" />
            <img className="sf sf4" src={snowflakes} alt="" />
      <h1>Welcome to Your</h1>
      <h1 id="name">Expense Tracker
      </h1>
    
      {userDetails && userDetails.Email ? <p>HI {userDetails.name}</p>:""}
      <nav className="mb-6">
        
      {userDetails && userDetails.Email ? <button onClick={handleLogout}>Logout</button>:<Link to="/login" className="btn1 btn m-9">Login</Link>}
        <Link to="/register" className="btn1 btn text-blue-500">Register</Link>
       
      </nav>

      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
      </Routes>
    </div>
  );
};

export default Home;
