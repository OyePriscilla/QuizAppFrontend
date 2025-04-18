import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  useEffect(() => {
    setIsLoggedIn(!!username)
  });


  const handleLogout = () => {
    localStorage.removeItem("username");
    navigate("/");
  };

  return (
    <nav className="sticky top-0 w-full bg-amber-500 text-white shadow-md z-50 max-h-max">
      <div className="w-full max-w-7xl mx-auto px-4 py-4 font-serif font-bold flex flex-col sm:flex-row items-center justify-between">
        {/* Logo or Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white drop-shadow-md mb-4 sm:mb-0">
          Inspiration Time 📖
        </h1>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-yellow-100 font-semibold transition-all"
          >
            Home
          </Link>

          {username ? (
            <>
              <Link
                to="/dashboard"
                className="px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-yellow-100 font-semibold transition-all"
              >
                Dashboard
              </Link>

              { isLoggedIn && <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-100 text-red-700 rounded-full hover:bg-red-200 font-semibold transition-all"
              >
                Log Out
              </button> }
            </>
          ) : (
            <>
              <Link
                to="/Bible-story"
                className="px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-yellow-100 font-semibold transition-all"
              >
                Bible Story
              </Link>
              <Link
                to="/signin"
                className="px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-yellow-100 font-semibold transition-all"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-white text-amber-600 rounded-full hover:bg-yellow-100 font-semibold transition-all"
              >
                Register
              </Link>
              <Link
                to="/help"
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-yellow-100 font-semibold transition-all"
              >
                Help
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
