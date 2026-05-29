import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();


  const handleLogin = async () => {
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // 🔐 Save token
      localStorage.setItem("token", data.token);

      // ⚠️ Check email verification
      if (data.emailVerified !== "true") {
        setError("Please verify your email before login.");
        return;
      }

      // ✅ Success → go to dashboard
      navigate("/dashboard");

    }catch (err) {
  console.error(err);
  setError("Server error. Try again.");
}
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-100 to-purple-100">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-3xl font-bold text-center">Welcome Back</h2>
        <p className="text-gray-500 text-center mt-2">
          Login to your account
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full mt-5 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mt-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:scale-105 transition"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4 text-gray-500">
          Don’t have an account? <span className="text-purple-600 cursor-pointer">Register</span>
        </p>

      </div>

    </div>
  );
}

export default Login;