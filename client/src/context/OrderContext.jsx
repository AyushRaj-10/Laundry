// src/contexts/OrderContext.jsx
import React, { useState, createContext } from "react";
import API from "../services/api";

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createOrder = async (orderData) => {
    setError(null);
    try {
      const res = await API.post("/orders", orderData);
      setOrders((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Create order failed");
      throw err;
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await API.get("/orders");
      setOrders(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Fetch orders failed");
    } finally {
      setLoading(false);
    }
  };

  const updateOrder = async (orderId, status) => {
    try {
      const res = await API.put(`/orders/${orderId}/status`, { status });
      setOrders((prev) =>
        prev.map((order) => (order._id === orderId ? res.data : order))
      );
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
      throw err;
    }
  };

  const dashboardStats = async () => {
    try {
      const res = await API.get("/orders/dashboard");
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || "Dashboard error");
      return null;
    }
  };

  return (
    <OrderContext.Provider
      value={{
        orders,
        loading,
        error,
        createOrder,
        fetchOrders,
        updateOrder,
        dashboardStats,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderContext;