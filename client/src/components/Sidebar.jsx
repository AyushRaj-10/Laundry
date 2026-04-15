import { NavLink, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { FiHome, FiShoppingCart, FiLogOut } from "react-icons/fi";

const Sidebar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside className="w-64 bg-white/10 backdrop-blur-md border-r border-white/20 p-6 flex flex-col gap-8">
      <h1 className="text-2xl font-bold text-white">OrderFlow</h1>
      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
            }`
          }
        >
          <FiHome /> Dashboard
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-white/10"
            }`
          }
        >
          <FiShoppingCart /> Order History
        </NavLink>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/20 mt-auto"
        >
          <FiLogOut /> Logout
        </button>
      </nav>
    </aside>
  );
};

export default Sidebar;