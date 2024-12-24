import { useState } from "react";
import { addExpense } from "../../utils/api";
import "./AddExpense.css"
import decor1 from '../../assets/decor1.png';
import snowflakes from '../../assets/snowflakes.png';

const AddExpense = ({ onExpenseAdded }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addExpense({ title, amount, category, dueDate });
      alert("Expense added");
      onExpenseAdded(data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="bg">

    <img className="decor1" src={decor1} alt=""/>

    <img className="sf1" src={snowflakes} alt=""/>
    <img className="sf sf2" src={snowflakes} alt=""/>
    <img className="sf sf3" src={snowflakes} alt=""/>
    <img className="sf sf4" src={snowflakes} alt=""/>
    

    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded">
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>

      <input
        type="text"
        placeholder="Title"
        className="border w-full p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        className="border w-full p-2 mb-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="date"
        className="border w-full p-2 mb-2"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border w-full p-2 mb-4"
      >
        <option value="">Select Category</option>
        <option value="Cafe Food">Cafe Food</option>
        <option value="Groceries">Groceries</option>
        <option value="Munchies">Munchies</option>
      </select>
      <button className="btn px-4 py-2">Add</button>
    </form>

    

    </div>
  );
};

export default AddExpense;
