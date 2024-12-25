import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cookies from "js-cookie";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "./Home.css";
import { useUserContext } from "./../components/context/userContext";

const Home = () => {
  const { userDetails, setLoading } = useUserContext();

  const handleLogout = () => {
    Cookies.remove("token");
    setLoading(false);
    window.location.href = "/login";
  };

  useEffect(() => {
    if (!userDetails) {
      console.log({ userDetails });
    }
  }, [userDetails]);

  return (
    <div className="container1">
      <div className="content">
        <div className="left-section">
          {userDetails && userDetails.Email ? <p className="greeting">Hi {userDetails.name}!</p> : ""}
          <h1 className="welcome">Welcome to Your</h1>
          <h1 className="app-name">Expense Tracker</h1>

          <nav className="navigation">
            {userDetails && userDetails.Email ? (
              <>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
                <Link to="/dashboard" className="dashboard-btn">
                  Go to Dashboard
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="btn login-btn">
                  Login
                </Link>
                <Link to="/register" className="btn register-btn">
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>

      </div>
    </div>
  );
};

export default Home;
