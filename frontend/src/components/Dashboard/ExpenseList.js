import { useEffect, useState } from "react";
import { fetchExpenses } from "../../utils/api";

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const { data } = await fetchExpenses();
        setExpenses(data.expenses);
      } catch (err) {
        alert("Failed to fetch expenses");
      }
    };

    getExpenses();
  }, []);

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Expenses</h2>
      <ul>
        {expenses.map((expense) => (
          <li key={expense._id} className="border-b py-2">
            <span>{expense.title} - ${expense.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
