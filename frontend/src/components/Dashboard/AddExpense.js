import { useState } from "react";
import { addExpense } from "../../utils/api";

const AddExpense = ({ onExpenseAdded }) => {
  const userEmail = "abcjohn@gmail.com"
 const [formData, setFormData] = useState({
    userEmail,
    sharedEmail: "",
    name: "",
    amount: "",
    dueDate: "",
    title:"",
    description:"",
    category:"",
    type:"",
    status:""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addExpense(formData);
      console.log(res);
      if(res.status === 201) alert("Expense added");
      // onExpenseAdded(data);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add expense");
    }
  };

  return (
    <div className="">
    <form onSubmit={handleSubmit} className="bg-gray-100 p-4 rounded mx-4 ">
      <h2 className="text-lg font-bold mb-4">Add Expense</h2>
      <input
        type="text"
        placeholder="Title"
        name="title"
        className="border w-full p-2 mb-2"
        value={formData.title}
          onChange={(e)=>handleChange(e)}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        className="border w-full p-2 mb-2"
        
        value={formData.description}
        onChange={handleChange}
      />
              <input
          type="text"
          name="sharedEmail"
          placeholder="Person's email"
           className="border w-full p-2 mb-2"
           value={formData.sharedEmail}
           onChange={handleChange}
        />
      <input
        type="number"
        placeholder="Amount"
        name="amount"
        className="border w-full p-2 mb-2"
        value={formData.amount}
        onChange={handleChange}
      />
      <input
        type="date"
        className="border w-full p-2 mb-2"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <select
          value={formData.category}
          onChange={handleChange}
          name="category"
        className="border w-full p-2 mb-4"
      >
        <option value="">Select Category</option>
        <option value="Cafe Food">Cafe Food</option>
        <option value="Groceries">Groceries</option>
        <option value="Munchies">Munchies</option>
        <option value="Outside Food">Outside Food</option>
        <option value="Other">Other</option>
      </select>
      <select
          value={formData.type}
          onChange={handleChange}
          name="type"
        className="border w-full p-2 mb-4"
      >
        <option value="">Select Type</option>
        <option value="To be Taken">To be Taken</option>
        <option value="To be Given">To be Given</option>
      </select>
      <select
          value={formData.status}
          onChange={handleChange}
          name="status"
        className="border w-full p-2 mb-4"
      >
        <option value="">Status</option>
        <option value="Pending">Pending</option>
        <option value="Settled">Settled</option>
      </select>
      <button className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
    </form>
    </div>
  );
};

export default AddExpense;
