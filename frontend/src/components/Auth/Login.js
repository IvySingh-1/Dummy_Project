import { useState } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import snowflakes from "../../assets/snowflakes.png";


const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      alert("Login successful");

      onLogin(data);
      // navigate("/");
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
      <img className="sf1" src={snowflakes} alt="" />
      <img className="sf sf2" src={snowflakes} alt="" />
      <img className="sf sf3" src={snowflakes} alt="" />
      <img className="sf sf4" src={snowflakes} alt="" />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-4 bg-gray-100 mt-10"
      >
        <h2 className="text-xl font-bold mb-4 mt-10">Login</h2>
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
        <button className="btn text-white px-4 py-2">Login</button>
      </form>
    </div>
  );
};

export default Login;