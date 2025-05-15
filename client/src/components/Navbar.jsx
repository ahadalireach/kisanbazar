"use client";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import {
  FaLeaf,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FaLeaf className="text-green-500 text-2xl" />
            <span className="text-xl font-bold text-green-600">KisanBazar</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-green-500 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/products"
              className="text-gray-700 hover:text-green-500 transition-colors"
            >
              Products
            </Link>
            <Link
              to="/farmers"
              className="text-gray-700 hover:text-green-500 transition-colors"
            >
              Farmers
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-green-500 transition-colors"
            >
              About
            </Link>

            {isAuthenticated && user?.role !== "admin" && (
              <Link to="/checkout" className="relative">
                <FaShoppingCart className="text-gray-700 hover:text-green-500 text-xl transition-colors" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Link>
            )}

            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors focus:outline-none"
                >
                  <FaUser className="text-xl" />
                  <span className="font-medium">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                    {user?.role === "admin" && (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Admin Dashboard
                      </Link>
                    )}

                    {user?.role === "farmer" && (
                      <Link
                        to="/farmer/dashboard"
                        className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        Farmer Dashboard
                      </Link>
                    )}

                    {user?.role !== "admin" && (
                      <>
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Profile
                        </Link>

                        <Link
                          to="/orders"
                          className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          Orders
                        </Link>
                      </>
                    )}

                    <Link
                      to="/messages"
                      className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Messages
                    </Link>

                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-500"
                    >
                      <div className="flex items-center space-x-2">
                        <FaSignOutAlt />
                        <span>Logout</span>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-green-500 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-500 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="text-2xl" />
              ) : (
                <FaBars className="text-2xl" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-green-500 transition-colors"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                to="/products"
                className="text-gray-700 hover:text-green-500 transition-colors"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                to="/farmers"
                className="text-gray-700 hover:text-green-500 transition-colors"
                onClick={toggleMenu}
              >
                Farmers
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-green-500 transition-colors"
                onClick={toggleMenu}
              >
                About
              </Link>

              <Link
                to="/checkout"
                className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors"
                onClick={toggleMenu}
              >
                <FaShoppingCart />
                <span>Cart ({cartItems.length})</span>
              </Link>

              {isAuthenticated ? (
                <>
                  {user?.role === "admin" && (
                    <Link
                      to="/admin/dashboard"
                      className="text-gray-700 hover:text-green-500 transition-colors"
                      onClick={toggleMenu}
                    >
                      Admin Dashboard
                    </Link>
                  )}

                  {user?.role === "farmer" && (
                    <Link
                      to="/farmer/dashboard"
                      className="text-gray-700 hover:text-green-500 transition-colors"
                      onClick={toggleMenu}
                    >
                      Farmer Dashboard
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-green-500 transition-colors"
                    onClick={toggleMenu}
                  >
                    Profile
                  </Link>

                  <Link
                    to="/orders"
                    className="text-gray-700 hover:text-green-500 transition-colors"
                    onClick={toggleMenu}
                  >
                    Orders
                  </Link>

                  <Link
                    to="/messages"
                    className="text-gray-700 hover:text-green-500 transition-colors"
                    onClick={toggleMenu}
                  >
                    Messages
                  </Link>

                  <button
                    onClick={() => {
                      handleLogout();
                      toggleMenu();
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-green-500 transition-colors"
                  >
                    <FaSignOutAlt />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-green-500 transition-colors"
                    onClick={toggleMenu}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors text-center"
                    onClick={toggleMenu}
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
