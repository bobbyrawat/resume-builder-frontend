import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../config/api";
export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isSignup
      ? `${BASE_URL}/api/auth/register`
      : `${BASE_URL}/api/auth/login`;

    const payload = isSignup
      ? { name, email, password }
      : { email, password };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Something went wrong");
        return;
      }
if (isSignup) {

  navigate("/verify-email");

} else {

  localStorage.setItem(
    "token",
    data.token
  );

 window.location.replace("/dashboard");
}
    } catch (err) {
      console.error(err);
      alert("Server error");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignup ? "Create Account 🚀" : "Welcome Back 👋"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              className="p-2 border rounded-lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-2 border rounded-lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2 cursor-pointer"
            >
              {showPassword ? "🙈" : "👁️"}
            </span>
          </div>

          <button className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm">
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-600 font-semibold cursor-pointer ml-1"
          >
            {isSignup ? "Login" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
}