/* This code snippet is setting up a router using Express in a Node.js application. It imports
necessary modules such as Express, controller functions for registering and logging in users,
validation middleware, and validation schemas. */
// routes/order.routes.js
import express from "express";
import {
  createOrder,
  getOrders,
  updateStatus,
  getDashboard
} from "../controllers/order.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createOrderSchema } from "../validators/order.validator.js";

const router = express.Router();



router.post("/", protect, validate(createOrderSchema), createOrder);
router.get("/", protect, getOrders);
router.put("/:id/status", protect, updateStatus);
router.get("/dashboard", protect, getDashboard);

export default router;