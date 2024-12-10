import React from "react";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard/BaseDashboard";
import ProtectedRoute from "../utils/ProtectedRoutes";
import ComingSoon from "../components/Base/ComingSoon";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/coming-soon" element={<ComingSoon />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
};

export default AppRoutes;
