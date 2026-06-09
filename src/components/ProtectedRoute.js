import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    alert("Access Denied: Please login to access dashboard controllers.");
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;