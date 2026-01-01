import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { CiLogout } from "react-icons/ci";
import { FaUserCircle } from "react-icons/fa";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      const parsed = JSON.parse(userData);
      setUser({ name: parsed.fullName });
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function clickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("click", clickOutside);
    return () => document.removeEventListener("click", clickOutside);
  }, []);

  return (
    <>
      {/* FIXED NAVBAR */}
      <nav className="max-sm:fixed top-0 left-0 z-50 w-full bg-gray-100 border-b border-gray-300 shadow-sm">
        <div className=" mx-auto md:px-8 py-4 md:flex justify-between items-center">
          <div className="flex px-8 justify-between">
          {/* Brand */}
          <Link to="/" className="text-2xl font-bold text-blue-700">
            MakeTodo
          </Link>

          {/* MOBILE MENU BUTTON */}
          <button
            className="md:hidden text-gray-700 text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
          </div>
          {/* ===== DESKTOP MENU ===== */}
          <div className="hidden md:flex gap-6 items-center bg-gray-100">
            <Link to="/" className="font-medium hover:text-blue-600">
              Home
            </Link>
            <Link to="/dashboard" className="font-medium hover:text-blue-600">
              Dashboard
            </Link>

            {!user && (
              <>
                <Link to="/login" className="font-medium hover:text-blue-600">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
                >
                  Sign Up
                </Link>
              </>
            )}

            {user && (
              <div className="relative" ref={dropdownRef}>
                {/* Profile icon */}
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-lg font-semibold hover:bg-blue-700"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>

                {/* Dropdown */}
                {profileOpen && (
                  <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-md p-3 min-w-[180px] shadow-lg">
                    <div className="text-gray-900 font-semibold mb-2">
                      Hello, {user.name}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left text-red-600 font-medium flex items-center gap-2 hover:text-red-700"
                    >
                      <CiLogout /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          {/* ===== MOBILE SLIDE MENU (Under Navbar) ===== */}
      {menuOpen && (
        <div className="max-md:block md:hidden bg-white border-t border-gray-300 px-6 py-4 space-y-3 mt-5 w-full">
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="font-medium hover:text-blue-600"
          >
            Home
          </Link>
          <br />
          <Link
            to="/dashboard"
            onClick={() => setMenuOpen(false)}
            className="font-medium hover:text-blue-600"
          >
            Dashboard
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="font-medium hover:text-blue-600"
              >
                Login
              </Link>
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="px-3 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}

          {user && (
            <>
              <div className="text-gray-900 font-semibold">
                Hello, {user.name}
              </div>
              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="text-red-600 font-medium flex items-center gap-2"
              >
                <CiLogout /> Logout
              </button>
            </>
          )}
        </div>
      )}
        </div>
      </nav>

      
    </>
  );
}
