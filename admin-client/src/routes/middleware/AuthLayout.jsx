import React from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import { Navigate } from "react-router-dom";

const AuthLayout = (props) => {
  const staffData =
    localStorage.getItem("user")

  if (!staffData) {
    return <Navigate to="/login" replace />;
  }

  return <DashboardLayout>{props.children}</DashboardLayout>;
};

export default AuthLayout;
