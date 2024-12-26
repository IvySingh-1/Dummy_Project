import { useState } from "react";
import { loginUser } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import snowflakes from "../../assets/snowflakes.png";
import toast, { Toaster } from "react-hot-toast";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      toast('Login successful', {
        icon: '🦌',
      });
      onLogin(data);
      // navigate("/");
      window.location.href = "/";
    } catch (err) {
      toast(`${err.response?.data?.message || "Login failed"}`, {
        icon: '➕',
      });
      // alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div>
        <div><Toaster/></div>
      <img className="sf1" src={snowflakes} alt="" />
      <img className="sf sf2" src={snowflakes} alt="" />
      <img className="sf sf3" src={snowflakes} alt="" />
      <img className="sf sf4" src={snowflakes} alt="" />
      <div className="bg-gray-100 opacity-80 w-fit rounded-xl">
      <form
        onSubmit={handleSubmit}
        className="mt-24 max-w-md mx-auto p-6  border-4 border-green-500 rounded-lg shadow-xl  opacity-90"
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
    </div>
  );
};

export default Login;
