import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return children;
};
export default ProtectedRoute;