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