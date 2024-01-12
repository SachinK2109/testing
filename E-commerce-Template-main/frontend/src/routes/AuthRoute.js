import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

let AuthRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  if (!isAuthenticated) {
    return children;
  }
  return <Navigate to="/" />;
};

export default AuthRoute;
