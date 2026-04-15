/* This code snippet is a JavaScript file named `app.js` that sets up a basic Express server with CORS
(Cross-Origin Resource Sharing) configuration. Here's a breakdown of what the code is doing: */
// app.js
import express from "express";
import cors from "cors";
import orderRoutes from "./routes/order.routes.js";
import authRoutes from "./routes/auth.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",  
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL
]

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); 

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      logger.warn("CORS blocked: %s", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(cors(corsOptions));

app.use(express.json());


app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;
