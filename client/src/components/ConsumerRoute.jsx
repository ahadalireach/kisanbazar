import { Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import Loader from "./Loader"

const ConsumerRoute = () => {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth)

  if (loading) {
    return <Loader />
  }

  return isAuthenticated && user?.role === "consumer" ? <Outlet /> : <Navigate to="/login" />
}

export default ConsumerRoute
