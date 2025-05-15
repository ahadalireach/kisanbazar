"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/slices/userSlice";
import { getAllOrders } from "../../redux/slices/orderSlice";
import { getCategories } from "../../redux/slices/categorySlice";
import { getProducts } from "../../redux/slices/productSlice";
import Loader from "../../components/Loader";
import { FaUsers, FaList, FaBox, FaUserCheck } from "react-icons/fa6";
import { FaShoppingCart, FaMoneyBillWave } from "react-icons/fa";
import { GiFarmer } from "react-icons/gi";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { users, loading: usersLoading } = useSelector((state) => state.users);
  const { adminOrders, loading: ordersLoading } = useSelector(
    (state) => state.orders
  );
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
  const { products, loading: productsLoading } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllOrders());
    dispatch(getCategories());
    dispatch(getProducts());
  }, [dispatch]);

  // Count users by role
  const userCounts = {
    total: users.length,
    farmers: users.filter((u) => u.role === "farmer").length,
    consumers: users.filter((u) => u.role === "consumer").length,
    admins: users.filter((u) => u.role === "admin").length,
  };

  // Count orders by status
  const orderCounts = {
    total: adminOrders.length,
    pending: adminOrders.filter((order) => order.status === "pending").length,
    accepted: adminOrders.filter((order) => order.status === "accepted").length,
    completed: adminOrders.filter((order) => order.status === "completed")
      .length,
    rejected: adminOrders.filter((order) => order.status === "rejected").length,
    cancelled: adminOrders.filter((order) => order.status === "cancelled")
      .length,
  };

  // Calculate total revenue
  const totalRevenue = adminOrders
    .filter((order) => order.status === "completed")
    .reduce((total, order) => total + order.totalAmount, 0);

  if (usersLoading || ordersLoading || categoriesLoading || productsLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Users</h3>
            <FaUsers className="text-blue-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">
            {userCounts.total - userCounts.admins}
          </p>
          <Link
            to="/admin/users"
            className="text-green-500 hover:text-green-700 text-sm mt-2 inline-block"
          >
            Manage Users
          </Link>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Orders</h3>
            <FaShoppingCart className="text-orange-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">{orderCounts.total}</p>
          <Link
            to="/admin/orders"
            className="text-green-500 hover:text-green-700 text-sm mt-2 inline-block"
          >
            View All Orders
          </Link>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <FaList className="text-purple-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">{categories.length}</p>
          <Link
            to="/admin/categories"
            className="text-green-500 hover:text-green-700 text-sm mt-2 inline-block"
          >
            Manage Categories
          </Link>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <span className="text-green-500 text-xl font-bold">
              <FaMoneyBillWave />
            </span>
          </div>
          <p className="text-3xl font-bold">₨{totalRevenue.toFixed(2)}</p>
          <span className="text-gray-500 text-sm mt-2 inline-block">
            From completed orders
          </span>
        </div>
      </div>

      <div className="glass p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-6">User Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-full">
                <GiFarmer className="text-green-500" />
              </div>
              <div>
                <p className="text-gray-500">Farmers</p>
                <p className="text-2xl font-bold">{userCounts.farmers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-full">
                <FaUserCheck className="text-blue-500" />
              </div>
              <div>
                <p className="text-gray-500">Consumers</p>
                <p className="text-2xl font-bold">{userCounts.consumers}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-full">
                <FaUsers className="text-purple-500" />
              </div>
              <div>
                <p className="text-gray-500">Admins</p>
                <p className="text-2xl font-bold">{userCounts.admins}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Order Stats */}
      <div className="glass p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-6">Order Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Pending</p>
            <p className="text-2xl font-bold text-blue-500">
              {orderCounts.pending}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Accepted</p>
            <p className="text-2xl font-bold text-green-500">
              {orderCounts.accepted}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Completed</p>
            <p className="text-2xl font-bold text-green-700">
              {orderCounts.completed}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Rejected</p>
            <p className="text-2xl font-bold text-red-500">
              {orderCounts.rejected}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <p className="text-gray-500">Cancelled</p>
            <p className="text-2xl font-bold text-red-700">
              {orderCounts.cancelled}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders */}
        <div className="glass p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Orders</h2>
            <Link
              to="/admin/orders"
              className="text-green-500 hover:text-green-700"
            >
              View All
            </Link>
          </div>

          {adminOrders.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3">Order ID</th>
                    <th className="text-left py-3">Customer</th>
                    <th className="text-center py-3">Status</th>
                    <th className="text-right py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {adminOrders.slice(0, 5).map((order) => (
                    <tr key={order._id} className="border-b border-gray-200">
                      <td className="py-3">
                        <Link
                          to={`/orders/${order._id}`}
                          className="text-green-500 hover:text-green-700"
                        >
                          #{order._id.substring(0, 8)}
                        </Link>
                      </td>
                      <td className="py-3">{order.consumer.name}</td>
                      <td className="text-center py-3">
                        <span
                          className={`badge ${
                            order.status === "pending"
                              ? "badge-blue"
                              : order.status === "accepted" ||
                                order.status === "completed"
                              ? "badge-green"
                              : "badge-red"
                          }`}
                        >
                          {order.status.charAt(0).toUpperCase() +
                            order.status.slice(1)}
                        </span>
                      </td>
                      <td className="text-right py-3 font-medium">
                        ₨{order.totalAmount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No orders yet.</p>
          )}
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Products</h2>
            <Link
              to="/products"
              className="text-green-500 hover:text-green-700"
            >
              View All
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3">Product</th>
                    <th className="text-left py-3">Farmer</th>
                    <th className="text-center py-3">Price</th>
                    <th className="text-right py-3">Stock</th>
                  </tr>
                </thead>
                <tbody>
                  {products.slice(0, 5).map((product) => (
                    <tr key={product._id} className="border-b border-gray-200">
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg overflow-hidden mr-2">
                            {product.images && product.images.length > 0 ? (
                              <img
                                src={product.images[0] || "/placeholder.svg"}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <FaBox className="text-green-500" />
                              </div>
                            )}
                          </div>
                          <Link
                            to={`/products/${product._id}`}
                            className="text-green-500 hover:text-green-700"
                          >
                            {product.name}
                          </Link>
                        </div>
                      </td>
                      <td className="py-3">{product.farmer?.name}</td>
                      <td className="text-center py-3">
                        ₨{product.price.toFixed(2)}
                      </td>
                      <td className="text-right py-3">
                        <span
                          className={`${
                            product.quantityAvailable === 0
                              ? "text-red-500"
                              : product.quantityAvailable < 5
                              ? "text-orange-500"
                              : "text-green-500"
                          } font-medium`}
                        >
                          {product.quantityAvailable} {product.unit}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No products yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
