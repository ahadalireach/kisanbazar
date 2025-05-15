import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "./Loader";

const PrivateRoute = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) {
    return <Loader />;
  }

  if (isAuthenticated && user?.role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
