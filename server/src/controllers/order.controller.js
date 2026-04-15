import Order from "../models/order.models.js";
import { v4 as uuidv4 } from "uuid";
import logger from "../config/logger.js";

// CREATE ORDER
export const createOrder = async (req, res) => {
  try {
    const { customerName, phone, garments } = req.body;

    let total = 0;
    garments.forEach(g => {
      total += g.quantity * g.price;
    });

    const order = new Order({
      orderId: uuidv4(),
      customerName,
      phone,
      garments,
      totalAmount: total
    });

    await order.save();

    logger.info("Order created: %s", order.orderId);

    res.status(201).json(order);
  } catch (error) {
    logger.error("Create order failed", error);
    res.status(500).json({ message: "Error creating order" });
  }
};

// GET ORDERS
export const getOrders = async (req, res) => {
  try {
    const { status, search } = req.query;

    let query = {};

    if (status) query.status = status;

    if (search) {
      query.$or = [
        { customerName: new RegExp(search, "i") },
        { phone: new RegExp(search) }
      ];
    }

    const orders = await Order.find(query).sort({ createdAt: -1 });

    logger.info("Fetched orders");

    res.json(orders);
  } catch (error) {
    logger.error("Fetch orders failed", error);
    res.status(500).json({ message: "Error fetching orders" });
  }
};

// UPDATE STATUS
export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    logger.info("Order status updated: %s → %s", id, status);

    res.json(order);
  } catch (error) {
    logger.error("Update status failed", error);
    res.status(500).json({ message: "Error updating status" });
  }
};

// DASHBOARD
export const getDashboard = async (req, res) => {
  try {
    const totalOrders = await Order.countDocuments();

    const revenueResult = await Order.aggregate([
      { $group: { _id: null, total: { $sum: "$totalAmount" } } }
    ]);

    const statusStats = await Order.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } }
    ]);

    logger.info("Dashboard data fetched");

    res.json({
      totalOrders,
      totalRevenue: revenueResult[0]?.total || 0,
      statusStats
    });
  } catch (error) {
    logger.error("Dashboard failed", error);
    res.status(500).json({ message: "Error fetching dashboard" });
  }
};