import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "./Loader"

const AdminRoute = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  if (loading) {
    return <Loader />
  }

  return isAuthenticated && user?.role === "admin" ? <Outlet /> : <Navigate to="/login" />
}

export default AdminRoute
