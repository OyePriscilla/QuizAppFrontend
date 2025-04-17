import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api/BaseUrls";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      setMessage("Please fill out all fields!");
      return;
    }

    // Send data to the backend using Axios
    try {
      const response = await axios.post(
        `${baseUrl}/api/auth/signup`,
        {
          username,
          password,
        }
      );

      // Handle the response from the backend
      if (response.data.message) {
        setMessage(response.data.message);
        localStorage.setItem("username", username);


        // Show success message
      } else {
        setMessage("Something went wrong, try again.");
      }
    } catch (error) {
      setMessage("Username already exist.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-50">
      <div className="p-6 bg-white rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold text-center text-blue-500 mb-4">
          Create Your Account
        </h2>

        {message && <p className="text-center text-red-500 mb-4 font-bold">⚡⚡{message}⚡⚡</p>}

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
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-3 w-full border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Registration;
