import React, { useState } from "react";

function Expense() {
  const [formData, setFormData] = useState({
    userEmail:"abcjohn@gmail.com",//fix any user mail for now
    sharedEmail: "",
    name: "",
    amount: "",
    dueDate: "",
    title:"",
    description:"",
    category:""
  });
  const [expenses, setExpenses] = useState([]);
  const getExpenses = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/", {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Fetched expenses:", data);
      setExpenses(data); // Update state with fetched expenses
    } catch (error) {
      console.error("Error fetching expenses:", error);
      alert("Failed to fetch expenses. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createExpense = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Expense created successfully:", data);
      alert("Expense created successfully!");
    } catch (error) {
      console.error("Error creating expense:", error);
      alert("Failed to create expense. Please try again.");
    }
  };
  return (
    <div className="flex flex-col max-w-md mx-auto space-y-4 p-4 border rounded-lg bg-white dark:bg-gray-800">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        Expense
      </h2>
      <form onSubmit={createExpense}>
        <input
          type="text"
          name="sharedEmail"
          placeholder="Person's email"
          value={formData.sharedEmail}
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Person's name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mb-2 p-2 border rounded w-full bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="" disabled>
            Select a category
          </option>
          <option value="Cafe Food">Cafe Food</option>
          <option value="Ordered Food">Ordered Food</option>
          <option value="Outside Food">Outside Food</option>
          <option value="Groceries">Groceries</option>
          <option value="Munchies">Munchies</option>
          <option value="Others">Others</option>
        </select>
        <input type="text" name="title" placeholder="title" />
        <input type="text" name="description" placeholder="description" />
        <input
          type="Date"
          name="dueDate"
          placeholder="Due date"
          value={formData.dueDate}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>



{/* get expenses */}
<button
        onClick={getExpenses}
        className="bg-black text-white py-2 px-4 rounded hover:bg-green-600"
      >
        Show Expenses
      </button>

      {expenses.length > 0 && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Expenses List
          </h3>
          <ul className="space-y-2">
            {expenses.map((expense, index) => (
              <li
                key={index}
                className="p-2 border rounded bg-gray-100 dark:bg-gray-700"
              >
                    <p className="bg-gray-500">
                  <strong>Title:</strong> {expense.title}
                </p>
             
                <p>
                  <strong>Name:</strong> {expense.name}
                </p>
                <p>
                  <strong>Email:</strong> {expense.sharedEmail}
                </p>
                <p>
                  <strong>Amount:</strong> {expense.amount}
                </p>
                <p>
                  <strong>Due Date:</strong>{" "}
                  {new Date(expense.dueDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Category:</strong> {expense.category}
                </p>
                <p>
                  <strong>Description:</strong> {expense.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default Expense;
