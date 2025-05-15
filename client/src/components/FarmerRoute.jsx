import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "./Loader"

const FarmerRoute = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  if (loading) {
    return <Loader />
  }

  return isAuthenticated && user?.role === "farmer" ? <Outlet /> : <Navigate to="/login" />
}

export default FarmerRoute
