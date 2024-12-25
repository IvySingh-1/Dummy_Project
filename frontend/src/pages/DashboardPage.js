import { useEffect } from "react";
import { useUserContext } from "../components/context/userContext";
import AddExpense from "../components/Dashboard/AddExpense";
import ExpenseList from "../components/Dashboard/ExpenseList";
import { useNavigate } from "react-router-dom";
const DashboardPage = () => {
  const { userDetails, setUserDetails, loading } = useUserContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading && (!userDetails||userDetails==null)) {
      // Redirect to login only when userDetails is still null after loading
      navigate("/login");
    }
  }, [loading, userDetails]); // Dependency array ensures it checks after loading finishes

  return (
    <div className="container mx-auto p-4">
      {loading ? (
        <div className="text-lg">Loading..</div>
      ) : (
        <>
          {userDetails && userDetails.Email ? <p>HI {userDetails.name}</p> : ""}
          <AddExpense />
          <ExpenseList />
        </>
      )}
    </div>
  );
};

export default DashboardPage;
