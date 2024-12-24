import { useUserContext } from "../components/context/userContext";
import AddExpense from "../components/Dashboard/AddExpense";
import ExpenseList from "../components/Dashboard/ExpenseList";

const DashboardPage = () => {
  const { userDetails, setUserDetails, loading } = useUserContext();

  if (!loading && !userDetails) {
    console.log({ userDetails });
    window.location.href = "/login";
  }
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
