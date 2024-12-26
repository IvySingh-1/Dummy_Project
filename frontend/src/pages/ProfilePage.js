import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../components/context/userContext";
import { Toaster } from "react-hot-toast";
import snowflakes from "../assets/snowflakes.png";
import "./ProfilePage.css"

const ProfilePage = () => {
  const { userDetails, loading } = useContext(UserContext);
  const [totalExpenseByCategory, setTotalExpenseByCategory] = useState({
    Food: 5000,
    Travel: 3000,
    Entertainment: 2000,
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container2">
      <div className="bg3">
        <Toaster />
        <img className="sf1" src={snowflakes} alt="snowflake" />
        <img className="sf sf2" src={snowflakes} alt="snowflake" />
        <img className="sf sf3" src={snowflakes} alt="snowflake" />
        <img className="sf sf4" src={snowflakes} alt="snowflake" />
        <h1 id="welcome">Welcome to Your Profile</h1>
        <h1 id="name1">{userDetails?.name || "Guest"}</h1>
        <div className="profile-details">
          <p><strong>Email:</strong> {userDetails?.Email || "N/A"}</p>
          <p><strong>Expense Score:</strong> {userDetails?.ExpenseScore || 0}</p>
        </div>
        <div className="expense-summary">
          <h2>Total Expenses by Category</h2>
          <ul>
            {Object.keys(totalExpenseByCategory).map((category) => (
              <li key={category}>
                <strong>{category}:</strong> {totalExpenseByCategory[category]} rs.
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;