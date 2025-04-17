// AdminLogin.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e:React.FormEvent) => {
    e.preventDefault();
    // Hardcoded admin credentials
    if (username === 'superadmin' && password === 'OyePriscilla') {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin/dashboard');
    } else {
      setErrorMessage('Invalid username or password');
    }
  };

  return (
    <div className="login-container flex items-center justify-center min-h-screen bg-gray-100 ">
  <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
    <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">Admin Login</h1>

    <form onSubmit={handleLogin} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <div>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-3 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

      <div className="flex justify-center">
        <button
          type="submit"
          className="w-full bg-purple-700 text-white p-3 rounded-lg hover:bg-purple-800 transition duration-200"
        >
          Login
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default AdminLogin;
