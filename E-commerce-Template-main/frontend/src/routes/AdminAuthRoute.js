import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

let AdminAuthRoute = ({ children }) => {
  const isAdminAuthenticated = useSelector(
    (state) => state.admin.isAdminAuthenticated
  );
  if (!isAdminAuthenticated) {
    return children;
  }
  return <Navigate to="/admin" />;
};

export default AdminAuthRoute;
