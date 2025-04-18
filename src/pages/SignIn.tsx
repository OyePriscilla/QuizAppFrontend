import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { baseUrl } from "../api/BaseUrls";
import { Eye, EyeOff } from "lucide-react";




const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setMessage("Please fill out all fields!");
      return;
    }

    // Send data to the backend using Axios
    try {
      const response = await fetch(`${baseUrl}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.message === "Login successful") {
        setMessage(data.message);

        // Optionally save userId in localStorage
        localStorage.setItem("username", username);

        // Redirect to dashboard or quiz page
        navigate("/quiz"); // Change to your desired route
      } else {
        setMessage(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="text-4xl font-bold text-center text-blue-500 mb-4">
          Log in
        </h2>

        {message && <p className="text-center text-red-500 mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-lg font-medium text-blue-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-lg font-medium text-blue-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
              minLength={6}
              />
              <button
              type="button"
              onClick={togglePassword}
              className="absolute top-105 right-15 inset-y-0 flex items-center text-blue-600 hover:text-purple-600"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Log in
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link
            to="/register"
            className=" text-amber-600  hover:bg-yellow-100 font-semibold transition-all"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
