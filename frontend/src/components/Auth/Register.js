import { useState } from "react";
import { registerUser } from "./../../utils/api";
import { useNavigate } from "react-router-dom";
import snowflakes from "../../assets/snowflakes.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      await registerUser({ name, email, password });
      alert("Registration successful");
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div>
      <img className="sf1" src={snowflakes} alt="" />
            <img className="sf sf2" src={snowflakes} alt="" />
            <img className="sf sf3" src={snowflakes} alt="" />
            <img className="sf sf4" src={snowflakes} alt="" />
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-gray-100 mt-10">
      <h2 className="text-xl font-bold mb-4">Register</h2>
      <input
        type="text"
        placeholder="Name"
        className="border w-full p-2 mb-4"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="border w-full p-2 mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border w-full p-2 mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="border w-full p-2 mb-4"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button className="btn bg-blue-500 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
    </div>
  );
};

export default Register;
