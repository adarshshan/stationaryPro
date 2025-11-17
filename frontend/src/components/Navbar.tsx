import React from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/useCartStore";
import type { AuthState } from "../store/useAuthStore";
import type { CartState } from "../store/useCartStore";
import { FiShoppingCart, FiLogIn, FiLogOut, FiSettings } from "react-icons/fi"; // Import icons

const Navbar: React.FC = () => {
  const user = useAuthStore((state: AuthState) => state.user);
  const logout = useAuthStore((state: AuthState) => state.logout);
  const items = useCartStore((state: CartState) => state.items);

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-bold">
          StationeryPro
        </Link>
        <div className="flex items-center">
          <Link to="/cart" className="text-white mr-4 flex items-center" title="View Cart">
            <FiShoppingCart className="text-xl" />
            {items.length > 0 && <span className="ml-1 text-sm">({items.length})</span>}
          </Link>
          {user ? (
            <button onClick={logout} className="text-white flex items-center" title="Logout">
              <FiLogOut className="text-xl" />
            </button>
          ) : (
            <Link to="/login" className="text-white flex items-center" title="Login">
              <FiLogIn className="text-xl" />
            </Link>
          )}
          <Link to="/admin" className="text-white ml-4 flex items-center" title="Admin Dashboard">
            <FiSettings className="text-xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
