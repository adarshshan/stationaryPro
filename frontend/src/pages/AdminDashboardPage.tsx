import React, { useEffect, useState } from "react";
// import type { Order } from "../types";
import api from "../api";
import {
  Package,
  User,
  MapPin,
  IndianRupee,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
} from "lucide-react";

interface Order {
  id: string;
  userId: string;
  items: { productId: number; quantity: number }[];
  total: number;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  status: string; // ← Now string, not strict enum
  createdAt?: string;
}

const AdminDashboardPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data);
      setError("");
    } catch (err) {
      setError("Failed to load orders. Please try again later.");
      console.error("Failed to fetch orders:", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string | undefined) => {
    // Normalize status to lowercase for comparison
    const normalized = status?.toLowerCase().trim();

    const styles: Record<
      string,
      { bg: string; text: string; icon: React.ReactNode }
    > = {
      pending: {
        bg: "bg-yellow-100 text-yellow-800",
        text: "Pending",
        icon: <Clock className="w-4 h-4" />,
      },
      processing: {
        bg: "bg-blue-100 text-blue-800",
        text: "Processing",
        icon: <Package className="w-4 h-4" />,
      },
      shipped: {
        bg: "bg-purple-100 text-purple-800",
        text: "Shipped",
        icon: <Truck className="w-4 h-4" />,
      },
      delivered: {
        bg: "bg-green-100 text-green-800",
        text: "Delivered",
        icon: <CheckCircle className="w-4 h-4" />,
      },
      cancelled: {
        bg: "bg-red-100 text-red-800",
        text: "Cancelled",
        icon: <XCircle className="w-4 h-4" />,
      },
    };

    const config = normalized ? styles[normalized] : null;

    // Fallback for unknown status
    const fallback = {
      bg: "bg-gray-100 text-gray-800",
      text: status || "Unknown",
      icon: <Clock className="w-4 h-4" />,
    };

    const { bg, text, icon } = config || fallback;

    return (
      <span
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium ${bg}`}
      >
        {icon}
        {text}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md">
          <XCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <p className="text-red-800 font-medium">{error}</p>
          <button
            onClick={fetchOrders}
            className="mt-4 px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Package className="w-10 h-10 text-indigo-600" />
            Admin Order Dashboard
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and track all customer orders
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Orders",
              value: orders.length,
              color: "bg-indigo-500",
            },
            {
              label: "Pending",
              value: orders.filter((o) => o.status === "Pending").length,
              color: "bg-yellow-500",
            },
            {
              label: "Shipped",
              value: orders.filter((o) => o.status === "shipped").length,
              color: "bg-purple-500",
            },
            {
              label: "Delivered",
              value: orders.filter((o) => o.status === "delivered").length,
              color: "bg-green-500",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl shadow-sm p-5 border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Package className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table - Desktop */}
        <div className="hidden lg:block bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
          <div className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600">
            <h2 className="text-xl font-semibold text-white">All Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Items
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200  max-h-96 overflow-y-scroll">
                {orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm font-medium text-indigo-600">
                        #{order.id.slice(0, 8)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        {order.userId}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <div className="space-y-1">
                          {order.items.map((item, i) => (
                            <div key={i}>
                              ID: {item.productId} × {item.quantity}
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900 flex items-center gap-1">
                        <IndianRupee className="w-4 h-4" />
                        {order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 max-w-xs">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div>
                            {order.address.street}, {order.address.city}
                            <br />
                            {order.address.state} - {order.address.zip}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(order.status)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Mobile Cards */}
        <div className="lg:hidden space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center text-gray-500">
              No orders to display
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-semibold">
                      Order #{order.id.slice(0, 8)}
                    </span>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Customer ID</span>
                    <span className="font-medium">{order.userId}</span>
                  </div>
                  <div>
                    <span className="text-gray-600 block mb-1">Items</span>
                    <div className="text-sm space-y-1">
                      {order.items.map((item, i) => (
                        <div key={i} className="text-gray-700">
                          Product {item.productId} × {item.quantity}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Amount</span>
                    <span className="text-xl font-bold text-indigo-600 flex items-center">
                      <IndianRupee className="w-5 h-5" />
                      {order.total.toFixed(2)}
                    </span>
                  </div>
                  <div className="pt-3 border-t">
                    <div className="flex gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                      <div>
                        {order.address.street}, {order.address.city},{" "}
                        {order.address.state} - {order.address.zip}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
