import { signInWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase"; // assuming firebase.js exports auth and db
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons for password toggle

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Set a message indicating login success
      setMessage("Login successful!");

      // Fetch username from Firestore (if required)
      const userRef = doc(db, "users", user.uid); // assuming the user collection is in Firestore under 'users'
      const userSnapshot = await getDoc(userRef);

      let username = user.email; // Default to email if username doesn't exist

      if (userSnapshot.exists()) {
        // Check if the username is stored in Firestore
        const userData = userSnapshot.data();
        if (userData && userData.username) {
          username = userData.username; // Use stored username from Firestore if it exists
        }
      }

      // Store the username in localStorage (or in state if needed)
      // @ts-ignore
      localStorage.setItem("username", username);

      // Optionally: Save/update the username in Firestore (if it's not set yet)
      if (!userSnapshot.exists()) {
        await setDoc(userRef, { username: user.email }, { merge: true });
      }

      // Redirect to a different page (e.g., quiz page)
      navigate("/quiz");

    } catch (error) {
      console.error(error);
      setMessage("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-700 mb-8">Login</h1>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          >
            Login
          </button>
        </form>

        {message && (
          <p className="text-center text-lg mt-4 text-green-600">{message}</p>
        )}

        <p className="text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-500 cursor-pointer hover:text-blue-700 transition-colors"
          >
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
