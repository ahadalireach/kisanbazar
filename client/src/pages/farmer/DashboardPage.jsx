"use client";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getFarmerProducts } from "../../redux/slices/productSlice";
import { getFarmerOrders } from "../../redux/slices/orderSlice";
import { getConversations } from "../../redux/slices/messageSlice";
import Loader from "../../components/Loader";
import {
  FaBox,
  FaShoppingCart,
  FaComment,
  FaPlus,
  FaChartLine,
} from "react-icons/fa";

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { farmerProducts, loading: productsLoading } = useSelector(
    (state) => state.products
  );
  const { farmerOrders, loading: ordersLoading } = useSelector(
    (state) => state.orders
  );
  const { conversations, loading: messagesLoading } = useSelector(
    (state) => state.messages
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getFarmerProducts());
    dispatch(getFarmerOrders());
    dispatch(getConversations());
  }, [dispatch]);

  const orderCounts = {
    pending: ordersLoading
      ? 0
      : farmerOrders.filter((order) => order.status === "pending").length,
    accepted: ordersLoading
      ? 0
      : farmerOrders.filter((order) => order.status === "accepted").length,
    completed: ordersLoading
      ? 0
      : farmerOrders.filter((order) => order.status === "completed").length,
    rejected: ordersLoading
      ? 0
      : farmerOrders.filter((order) => order.status === "rejected").length,
    cancelled: ordersLoading
      ? 0
      : farmerOrders.filter((order) => order.status === "cancelled").length,
  };

  const unreadMessages = messagesLoading
    ? 0
    : conversations.reduce(
        (total, conversation) => total + conversation.unreadCount,
        0
      );

  const totalRevenue = ordersLoading
    ? 0
    : farmerOrders
        .filter((order) => order.status === "completed")
        .reduce((total, order) => total + order.totalAmount, 0);

  if (productsLoading || ordersLoading || messagesLoading) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user?.name}!</p>
        </div>
        <Link
          to="/farmer/products/add"
          className="mt-4 md:mt-0 btn btn-primary flex items-center space-x-2"
        >
          <FaPlus />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Products</h3>
            <FaBox className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">{farmerProducts.length}</p>
          <Link
            to="/farmer/products"
            className="text-green-500 hover:text-green-700 text-sm mt-2 inline-block"
          >
            Manage Products
          </Link>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Pending Orders</h3>
            <FaShoppingCart className="text-orange-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">{orderCounts.pending}</p>
          <Link
            to="/farmer/orders"
            className="text-green-500 hover:text-green-700 text-sm mt-2 inline-block"
          >
            View All Orders
          </Link>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Unread Messages</h3>
            <FaComment className="text-blue-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">{unreadMessages}</p>
          <Link
            to="/messages"
            className="text-green-500 hover:text-green-700 text-sm mt-2 inline-block"
          >
            View Messages
          </Link>
        </div>

        <div className="glass p-6 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <FaChartLine className="text-green-500 text-xl" />
          </div>
          <p className="text-3xl font-bold">₨{totalRevenue.toFixed(2)}</p>
          <span className="text-gray-500 text-sm mt-2 inline-block">
            From completed orders
          </span>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass p-6 rounded-xl mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Orders</h2>
          <Link
            to="/farmer/orders"
            className="text-green-500 hover:text-green-700"
          >
            View All
          </Link>
        </div>

        {farmerOrders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3">Order ID</th>
                  <th className="text-left py-3">Customer</th>
                  <th className="text-center py-3">Date</th>
                  <th className="text-center py-3">Status</th>
                  <th className="text-right py-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {farmerOrders.slice(0, 5).map((order) => (
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
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
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

      {/* Low Stock Products */}
      <div className="glass p-6 rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Low Stock Products</h2>
          <Link
            to="/farmer/products"
            className="text-green-500 hover:text-green-700"
          >
            Manage Inventory
          </Link>
        </div>

        {farmerProducts.filter((product) => product.quantityAvailable < 10)
          .length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3">Product</th>
                  <th className="text-center py-3">Price</th>
                  <th className="text-center py-3">Quantity Left</th>
                  <th className="text-right py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {farmerProducts
                  .filter((product) => product.quantityAvailable < 10)
                  .slice(0, 5)
                  .map((product) => (
                    <tr key={product._id} className="border-b border-gray-200">
                      <td className="py-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg overflow-hidden mr-3">
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
                          <span>{product.name}</span>
                        </div>
                      </td>
                      <td className="text-center py-3">
                        ₨{product.price.toFixed(2)}
                      </td>
                      <td className="text-center py-3">
                        <span
                          className={`${
                            product.quantityAvailable === 0
                              ? "text-red-500"
                              : product.quantityAvailable < 5
                              ? "text-orange-500"
                              : "text-yellow-500"
                          } font-medium`}
                        >
                          {product.quantityAvailable} {product.unit}
                        </span>
                      </td>
                      <td className="text-right py-3">
                        <Link
                          to={`/farmer/products/edit/${product._id}`}
                          className="text-green-500 hover:text-green-700"
                        >
                          Update Stock
                        </Link>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-600 text-center py-4">
            No low stock products.
          </p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
