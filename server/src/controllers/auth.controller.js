/**
 * The above functions handle user registration and login by hashing passwords, generating tokens, and
 * logging relevant information.
 * @param req - `req` stands for request and it is an object that represents the HTTP request made by
 * the client to the server. It contains information about the request such as the headers, body,
 * parameters, and more. In the provided code snippets, `req` is used to access the data sent by the
 * @param res - The `res` parameter in your code represents the response object in Express.js. It is
 * used to send a response back to the client making the request. In your code, you are using `res` to
 * send JSON responses with status codes such as 200 for successful requests and 400 or
 * @returns For the `register` function:
 * - If the user already exists, it returns a status of 400 with a JSON response `{ message: "User
 * already exists" }`.
 * - If the registration is successful, it returns a status of 201 with a JSON response containing a
 * token and user information.
 */
import User from "../models/auth.models.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";
import logger from "../config/logger.js";

// REGISTER
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // ✅ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // ✅ Hash password
    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashed
    });

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    logger.info("User registered: %s", email);

    // ✅ Send safe response
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

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