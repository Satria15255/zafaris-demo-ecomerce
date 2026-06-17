import React from "react";
import {
  FaTachometerAlt,
  FaCreditCard,
  FaClipboardList,
  FaBoxes,
  FaSignOutAlt,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AdminSidebar = () => {
  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      {/* Header / Logo */}
      <div className="p-4 text-xl font-bold border-b border-gray-700">
        Zafaris Admin
      </div>

      {/* Menu Items (otomatis memenuhi tinggi dengan flex-1) */}
      <div className="flex-1 overflow-y-auto p-3 space-y-6">
        <h1
          label="Dashboard"
          className="pb-2 flex items-center gap-2 border-b border-gray-700"
        >
          <FaTachometerAlt />
          Dashboard
        </h1>
        <NavLink
          as={NavLink}
          to="/admin/product"
          label="Produk"
          className="pb-2 flex items-center gap-2 border-b border-gray-700"
        >
          <FaBoxes />
          Produk
        </NavLink>
        <NavLink
          as={NavLink}
          to="/admin/transaction"
          label="transaksi"
          className="pb-2 flex items-center gap-2 border-b border-gray-700"
        >
          <FaClipboardList />
          Transaksi
        </NavLink>
        <NavLink
          as={NavLink}
          to="/admin/user"
          label="Pelanggan"
          className="pb-2 flex items-center gap-2 border-b border-gray-700"
        >
          <FaCreditCard />
          Users
        </NavLink>
      </div>

      {/* Logout (tetap di bawah) */}
      <div className="p-4 border-t border-gray-700">
        <NavLink
          as={NavLink}
          to="/"
          label="Logout"
          className="font-bold flex items-center gap-2"
        >
          <FaSignOutAlt />
          Log Out
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;
