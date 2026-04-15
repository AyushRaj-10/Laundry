// src/pages/OrderHistory.jsx
import { useEffect, useContext, useState } from "react";
import OrderContext from "../context/OrderContext";
import { motion } from "framer-motion";

// Map backend status to display labels
const statusDisplay = {
  RECEIVED: "Received",
  PROCESSING: "Processing",
  READY: "Ready",
  DELIVERED: "Delivered",
};

const OrderHistory = () => {
  const { orders, fetchOrders, updateOrder, loading } = useContext(OrderContext);
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrder(orderId, newStatus);
    } catch (error) {
      console.error(error);
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) return <div className="text-white text-center mt-10">Loading orders...</div>;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h1 className="text-3xl font-bold text-white">Order History</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-white border-collapse">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-4">Customer</th>
              <th className="text-left py-3 px-4">Phone</th>
              <th className="text-left py-3 px-4">Total Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-4">{order.customerName}</td>
                <td className="py-3 px-4">{order.phone}</td>
                <td className="py-3 px-4">
                  ${order.totalAmount?.toFixed(2) ?? "0.00"}
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold
                    ${order.status === "RECEIVED" ? "bg-yellow-500/20 text-yellow-300" :
                      order.status === "PROCESSING" ? "bg-blue-500/20 text-blue-300" :
                      order.status === "READY" ? "bg-green-500/20 text-green-300" :
                      "bg-gray-500/20 text-gray-300"}`}
                  >
                    {statusDisplay[order.status] || order.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    disabled={updatingId === order._id}
                    className="bg-white/10 border border-white/20 rounded px-2 py-1 text-sm"
                  >
                    <option value="RECEIVED">Received</option>
                    <option value="PROCESSING">Processing</option>
                    <option value="READY">Ready</option>
                    <option value="DELIVERED">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default OrderHistory;