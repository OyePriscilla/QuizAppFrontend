import { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    const hardcodedUsername = "Superadmin"; // Hardcoded username
    const hardcodedPassword = "OyeSamuel"; // Hardcoded password

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setMessage("Login successful!");
      navigate("/admin/dashboard"); // Redirect to admin dashboard
    } else {
      setMessage("Invalid username or password");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Admin Login</h1>
      <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          className="w-full border p-2 rounded-lg"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full border p-2 rounded-lg"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Login
        </button>
      </form>

      {message && <p className="text-center text-red-500 mt-4">{message}</p>}
    </div>
  );
};

export default AdminLogin;
