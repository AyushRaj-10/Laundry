/* This code snippet is setting up a router using Express in a Node.js application. It imports
necessary modules such as Express, controller functions for handling order-related operations like
creating orders, getting orders, updating order status, and getting dashboard data. It also imports
middleware functions for authentication (protect), validation (validate), and validation schemas for
orders. */
import express from "express";
import { register, login } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;