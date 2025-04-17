import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 w-full bg-amber-500 text-white shadow-md z-50 h-30">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between">
        {/* Logo or Title */}
        <h1 className="text-2xl font-bold mb-2 sm:mb-0">Story Time</h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-end space-x-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>

          {username ? (
            <>
              <Link to="/dashboard" className="hover:underline">
                Dashboard
              </Link>
              <Link to="/quiz" className="hover:underline">
                Quiz
              </Link>
              <button
                onClick={handleLogout}
                className="border-2 px-3 py-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link to="/Bible-story" className="hover:underline">
                Bible Story
              </Link>
              <Link
                to="/signin"
                className="border-2 px-3 py-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="border-2 px-3 py-1 rounded-lg bg-white text-amber-900 hover:bg-gray-300"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
