import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/admin-login" replace />;
  if (user.role !== "admin")
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
      </div>
    );

  return children;
};

export default AdminRoute;
