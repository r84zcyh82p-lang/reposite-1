import { Navigate, Outlet } from "react-router-dom";

/**
 * Protected route component
 * Redirect to login if user is not authenticated
 */
export default function ProtectedRoutes() {
  const isAuthenticated = Boolean(
    localStorage.getItem("authToken")
  );

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}