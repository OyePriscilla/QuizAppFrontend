import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    // Remove the username from localStorage and navigate to the home page
    localStorage.removeItem("username");
    navigate("/"); // Navigate to home page after logging out
  };

  return (
    <div className="fixed top-0 w-full p-3 bg-amber-900 text-white shadow-md z-50">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bible Story & Quiz</h1>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-6 text-lg">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {username ? (
            <>
              {/* Show only when logged in */}
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 p-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {/* Show only when not logged in */}
              <Link to="/Bible-story" className="hover:underline">
                Bible Story
              </Link>
              <Link
                to="/signin"
                className="border-2 p-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="border-2 p-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className="sm:hidden flex items-center space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {username ? (
            <>
              {/* Show Quiz and Log Out on mobile when logged in */}
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 p-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              {/* Show Bible Story, Sign In, and Register on mobile when not logged in */}
              <Link to="/Bible-story" className="hover:underline">
                Bible Story
              </Link>
              <Link
                to="/signin"
                className="border-2 p-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Sign In
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
