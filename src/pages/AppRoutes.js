import React from "react";
import Login from "../components/Auth/Login";
import Dashboard from "../components/Dashboard/BaseDashboard";
import ProtectedRoute from "../utils/ProtectedRoutes";
import ComingSoon from "../components/Base/ComingSoon";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Navbar from "../components/Dashboard/BaseNavbar";
import ExamPage from "../components/Dashboard/Student/ExamPage";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/coming-soon" element={<><Navbar/><ComingSoon /></>} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam"
        element={
          <ProtectedRoute>
            <ExamPage />
          </ProtectedRoute>
        }
      />
    </Routes>

  );
};

export default AppRoutes;
