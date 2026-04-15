# 🤖 AI Usage Report

## Tools Used

| Tool | Purpose |
|------|---------|
| **Claude AI** | Architecture design, prompt engineering, code scaffolding |
| **ChatGPT** | Debugging, boilerplate generation, README drafting |

---

## Where AI Helped Most

- Mongoose model boilerplate and schema design
- Axios interceptor pattern for JWT attachment
- React Context API structure and state management
- Express middleware chaining and error handling patterns
- Postman collection generation for API testing

---

## Sample Prompts Used

| Prompt # | Goal | Tool Used |
|----------|------|-----------|
| 1 | Scaffold full backend with Node.js, Express, MongoDB, JWT | Claude AI |
| 2 | Build React frontend with Context API, protected routes, Tailwind | Claude AI |
| 3 | Generate production-grade README | ChatGPT |
| 4 | Debug specific bugs with file context | ChatGPT |
| 5 | Generate Postman collection JSON | Claude AI |

---

## 🐛 Issues Found in AI-Generated Code & Fixes Applied

---

### Issue 1 — Auth Middleware Execution Order

**File:** `backend/middleware/auth.middleware.js`

**What AI generated:**
```js
const protect = (req, res, next) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
};
```

**What was wrong:**
AI used `req.user._id` in controllers without ensuring the auth middleware ran first. Controllers were receiving `req.user` as `undefined`, causing runtime crashes.

**Fix applied:**
```js
// server.js — ensure middleware is registered before routes
app.use('/api/orders', protect, orderRoutes);
app.use('/api/dashboard', protect, dashboardRoutes);
```
```js
// auth.middleware.js — added null check and try-catch
const protect = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ success: false, message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Token is invalid or expired' });
  }
};
```

---

### Issue 2 — estimatedDeliveryDate as a Static String

**File:** `backend/controllers/order.controller.js`

**What AI generated:**
```js
const order = new Order({
  customerName,
  phoneNumber,
  garments,
  estimatedDeliveryDate: '3 days',
});
```

**What was wrong:**
AI hardcoded the value as a plain string `'3 days'` instead of computing an actual JavaScript `Date` object. MongoDB stored it as a string, breaking any date-based filtering or display.

**Fix applied:**
```js
const order = new Order({
  customerName,
  phoneNumber,
  garments,
  estimatedDeliveryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
});
```

---

### Issue 3 — Axios Interceptor Causing Infinite Redirect Loop

**File:** `frontend/src/api/api.js`

**What AI generated:**
```js
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

**What was wrong:**
The interceptor redirected to `/login` on every 401 — including the login request itself. If login credentials were wrong (which returns 401), the page would redirect to `/login` and trigger another request, creating an infinite loop.

**Fix applied:**
```js
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== '/login'
    ) {
      localStorage.clear();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```

---

### Issue 4 — Missing CORS Configuration

**File:** `backend/server.js`

**What AI generated:**
```js
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api', routes);
```

**What was wrong:**
AI never added CORS middleware. Every request from the React frontend was blocked by the browser with a `Cross-Origin Request Blocked` error, making the entire frontend unable to communicate with the backend.

**Fix applied:**
```js
const cors = require('cors');

app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
}));
app.use(express.json());
```

---

### Issue 5 — Wildcard Route Breaking Express

**File:** `backend/server.js`

**What AI generated:**
```js
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});
```

**What was wrong:**
AI added an Express wildcard route `*` which is invalid syntax in Express v5+ and caused a startup error. It also intercepted all unmatched API routes before the 404 handler could respond properly.

**Fix applied:**
```js
// Removed wildcard route entirely for API-only backend
// Added proper 404 handler instead
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});
```

---

### Issue 6 — Missing async/await in Frontend API Calls

**File:** `frontend/src/context/OrderContext.jsx`

**What AI generated:**
```js
const fetchOrders = () => {
  useEffect(() => {
    api.get('/orders').then(res => setOrders(res.data.data));
  }, []);
};
```

**What was wrong:**
AI missed proper `async/await` handling inside `useEffect`. Errors were silently swallowed — if the API call failed, the UI showed nothing and gave no feedback. Also, `useEffect` cannot directly accept an async function.

**Fix applied:**
```js
useEffect(() => {
  const loadOrders = async () => {
    try {
      const res = await api.get('/orders');
      setOrders(res.data.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch orders');
    }
  };

  loadOrders();
}, []);
```

---

### Issue 7 — API Response Leaking Sensitive User Data

**File:** `backend/controllers/auth.controller.js`

**What AI generated:**
```js
const user = await User.findById(req.user.id);
res.status(200).json({ success: true, data: user });
```

**What was wrong:**
AI returned the full Mongoose document including the hashed `password` field in the API response. This is a security risk — password hashes should never leave the server.

**Fix applied:**
```js
const user = await User.findById(req.user.id).select('-password');
res.status(200).json({ success: true, data: user });
```

---

### Issue 8 — MongoDB URI Undefined at Connection Time

**File:** `backend/config/db.js`

**What AI generated:**
```js
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('MongoDB connected');
};
```

**What was wrong:**
AI never imported or initialized `dotenv` before the connection call. When `connectDB()` ran, `process.env.MONGO_URI` was `undefined`, causing a silent connection failure with a confusing Mongoose error.

**Fix applied:**
```js
// server.js — dotenv must be loaded first, before anything else
require('dotenv').config();

const connectDB = require('./config/db');
connectDB();
```
```js
// config/db.js — added error logging and process exit on failure
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  }
};
```

---

## ✅ Improvements Made Beyond AI Suggestions

| Area | Improvement |
|------|-------------|
| Auth responses | Excluded password hash from all user-facing responses |
| API consistency | Standardized all responses to `{ success, data, message }` format |
| MongoDB connection | Added lifecycle handling and graceful failure with `process.exit(1)` |
| Logging | Added structured logging using Winston for better observability |
| Routing | Fixed versioning inconsistencies (`/api` vs `/api/v1`) across all routes |
| Axios instance | Built centralized instance with interceptors for cleaner API integration |
| Code structure | Refactored for maintainability — clear separation of controllers, routes, middleware |

---

## ⚖️ Tradeoffs

### What Was Skipped
- WebSocket / real-time order status updates
- Role-based access control (admin vs staff)
- SMS / email notifications on status change
- Unit and integration tests
- Pagination on order list

### What I'd Improve With More Time
- Add Redis caching for dashboard stats aggregation
- Implement pagination and cursor-based scrolling for orders
- Add garment-type search with full-text MongoDB indexing
- Deploy backend on Railway, frontend on Vercel
- Write Jest + Supertest tests for all API endpoints