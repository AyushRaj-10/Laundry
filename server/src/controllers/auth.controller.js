import User from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import logger from "../config/logger.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    logger.info("User registered: %s", email);

    res.status(201).json(user);
  } catch (err) {
    logger.error("Register failed", err);
    res.status(500).json({ message: "Register failed" });
  }
};

// LOGIN
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info("User logged in: %s", email);

    res.json({ token });
  } catch (err) {
    logger.error("Login failed", err);
    res.status(500).json({ message: "Login failed" });
  }
};