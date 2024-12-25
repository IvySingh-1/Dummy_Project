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
        className="mt-36 max-w-md mx-auto p-6 bg-red-900 border-4 border-green-500 rounded-lg shadow-xl  opacity-90"
      >
        <h2 className="text-center text-2xl font-extrabold mb-4 mt-10 text-green-500 uppercase tracking-wider">LOGIN</h2>
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-4 mt-5 "
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-4 mt-5"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transform hover:scale-105 transition duration-300 ease-in-out mt-5 ">
  Login
</button>

      </form>
    </div>
  );
};

export default Login;
