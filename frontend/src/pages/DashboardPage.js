import AddExpense from "../components/Dashboard/AddExpense";
import ExpenseList from "../components/Dashboard/ExpenseList";

const DashboardPage = () => (
  <div className="container mx-auto p-4">
    <AddExpense />
    <ExpenseList />
  </div>
);

export default DashboardPage;
