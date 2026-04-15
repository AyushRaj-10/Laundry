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
  const { orders, fetchOrders, updateOrder, loading } =
    useContext(OrderContext);
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

  if (loading)
    return (
      <div className="text-white text-center mt-10">Loading orders...</div>
    );

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
              <th className="text-left py-3 px-4">Items</th>
              <th className="text-left py-3 px-4">Total Amount</th>
              <th className="text-left py-3 px-4">Status</th>
              <th className="text-left py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
  <tr
    key={order._id}
    className="border-b border-white/10 hover:bg-white/5 transition-colors duration-100"
  >
    <td className="py-3 px-4">
      <span className="font-medium text-sm">{order.customerName}</span>
    </td>

    <td className="py-3 px-4">
      <span className="text-xs text-white/50 tabular-nums">{order.phone}</span>
    </td>

    <td className="py-3 px-4">
      <div className="bg-white/5 rounded-md border border-white/10 px-2.5 py-1.5 min-w-[160px]">
        {order.garments?.map((item, idx) => (
          <div
            key={idx}
            className={`flex justify-between items-center text-xs py-1 ${
              idx < order.garments.length - 1
                ? "border-b border-white/10 mb-1"
                : ""
            }`}
          >
            <span className="text-white/90">{item.type} × {item.quantity}</span>
            <span className="text-white/50 tabular-nums">₹{item.quantity * item.price}</span>
          </div>
        ))}
      </div>
    </td>

    <td className="py-3 px-4">
      <span className="font-medium text-sm tabular-nums">
        ₹{order.totalAmount?.toFixed(2) ?? "0.00"}
      </span>
    </td>

    <td className="py-3 px-4">
      {(() => {
        const styles = {
          RECEIVED:   "bg-amber-500/15 text-amber-300 border border-amber-500/20",
          PROCESSING: "bg-blue-500/15  text-blue-300  border border-blue-500/20",
          READY:      "bg-green-500/15 text-green-300 border border-green-500/20",
          DELIVERED:  "bg-white/10     text-white/50  border border-white/10",
        };
        const dots = {
          RECEIVED: "bg-amber-400",
          PROCESSING: "bg-blue-400",
          READY: "bg-green-400",
          DELIVERED: "bg-white/40",
        };
        return (
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${styles[order.status] ?? styles.DELIVERED}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dots[order.status] ?? dots.DELIVERED}`} />
            {statusDisplay[order.status] || order.status}
          </span>
        );
      })()}
    </td>

    <td className="py-3 px-4">
      <select
        value={order.status}
        onChange={(e) => handleStatusChange(order._id, e.target.value)}
        disabled={updatingId === order._id}
        className="bg-white/10 border border-white/20 hover:border-white/40 rounded-md px-2.5 py-1.5 text-xs transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
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
