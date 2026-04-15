/* This code snippet is defining Mongoose schemas for a garment and an order in a Node.js application
using MongoDB as the database. Here's a breakdown of what each part does: */
import mongoose from "mongoose";

const garmentSchema = new mongoose.Schema({
  type: String,
  quantity: Number,
  price: Number
});

const orderSchema = new mongoose.Schema({
  orderId: String,
  customerName: String,
  phone: String,
  garments: [garmentSchema],
  totalAmount: Number,
  status: {
    type: String,
    enum: ["RECEIVED", "PROCESSING", "READY", "DELIVERED"],
    default: "RECEIVED"
  }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);