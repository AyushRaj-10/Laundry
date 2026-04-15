PROMPT-1



Act as a Senior Backend Engineer. Scaffold a production-ready REST API 
for a dry cleaning store order management system.

**Tech Stack:** Node.js + Express.js + MongoDB + Mongoose + JWT Auth

**Folder Structure to generate:**
laundryflow/
├── backend/
│   ├── config/         # db.js (MongoDB connection)
│   ├── controllers/    # auth.controller.js, order.controller.js
│   ├── middleware/     # auth.middleware.js, error.middleware.js
│   ├── models/         # User.model.js, Order.model.js
│   ├── routes/         # auth.routes.js, order.routes.js
│   ├── utils/          # generateOrderId.js
│   ├── .env.example
│   └── server.js

**Models to create:**

User:
- name: String (required)
- email: String (required, unique)
- password: String (hashed with bcrypt)
- createdAt: Date

Order:
- orderId: String (auto-generated, e.g., DRY-2024-XXXX, unique)
- customerName: String (required)
- phoneNumber: String (required)
- garments: [{ type: String, quantity: Number, pricePerItem: Number }]
- totalAmount: Number (auto-calculated)
- status: Enum ['RECEIVED', 'PROCESSING', 'READY', 'DELIVERED'] (default: RECEIVED)
- estimatedDeliveryDate: Date (auto-set to +3 days from createdAt)
- createdBy: ObjectId ref User
- createdAt: Date

**API Endpoints to generate:**

AUTH:
POST   /api/auth/register     → Register user
POST   /api/auth/login        → Login, return JWT

ORDERS (all protected by JWT middleware):
POST   /api/orders            → Create order (auto-calc total, generate ID)
GET    /api/orders            → List all orders (filters: status, customerName, phoneNumber, garmentType)
GET    /api/orders/:id        → Get single order
PATCH  /api/orders/:id/status → Update status only
DELETE /api/orders/:id        → Delete order

DASHBOARD (protected):
GET    /api/dashboard         → Return: totalOrders, totalRevenue, ordersByStatus {}

**Requirements:**
- Every controller wrapped in try-catch
- Global error middleware that returns: { success: false, message: "..." }
- Success responses always return: { success: true, data: {...} }
- JWT middleware that reads Authorization: Bearer <token>
- Password hashed with bcrypt (saltRounds: 10)
- generateOrderId.js should use: "DRY-" + year + "-" + 4-digit random number
- estimatedDeliveryDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)

Generate all files completely. Do not skip any file. Start with 
server.js, then config/db.js, then models, then middleware, 
then utils, then controllers, then routes.





PROMPT-2

I have two React Context providers: `AuthContext` (handling registration, login, and user state) and `OrderContext` (handling CRUD operations for orders and dashboard stats).

Based on these contexts, please generate a structured React frontend using Tailwind CSS and React Router.

1. Architecture Requirements:


Act as a Senior Frontend Engineer. Build a React frontend for a dry 
cleaning order management system. The backend API is already built.

**Tech Stack:** React + Tailwind CSS + React Router v6 + Axios + Framer Motion

**Folder Structure:**
frontend/src/
├── api/            # api.js (axios instance)
├── context/        # AuthContext.jsx, OrderContext.jsx
├── components/     # Reusable UI: Button, Badge, Modal, StatCard, OrderTable
├── layouts/        # MainLayout.jsx (sidebar + topbar)
├── pages/          # Login.jsx, Register.jsx, Dashboard.jsx, 
│                   # OrderHistory.jsx, CreateOrder.jsx
├── routes/         # ProtectedRoute.jsx
└── App.jsx

**api.js — Axios instance (generate exactly this pattern):**
- baseURL from import.meta.env.VITE_API_URL
- Request interceptor: attach token from localStorage as Authorization: Bearer <token>
- Response interceptor: if 401, clear localStorage and redirect to /login

**AuthContext.jsx must provide:**
- user, token, loading states
- register(formData) → POST /api/auth/register
- login(formData) → POST /api/auth/login → store token in localStorage
- logout() → clear localStorage, reset state

**OrderContext.jsx must provide:**
- orders, dashboardStats, loading, error states
- fetchOrders(filters?) → GET /api/orders with optional query params
- createOrder(orderData) → POST /api/orders
- updateOrderStatus(id, status) → PATCH /api/orders/:id/status
- fetchDashboardStats() → GET /api/dashboard

**Pages to build:**

1. Login.jsx & Register.jsx
   - Clean centered card layout
   - Form validation (empty fields, phone = 10 digits)
   - Show error from context below submit button
   - Link between login/register pages

2. Dashboard.jsx (protected)
   - 4 StatCards: Total Orders, Total Revenue, Ready for Pickup, Delivered
   - Recent orders table (last 5)
   - Framer Motion fade-in on load

3. OrderHistory.jsx (protected)
   - Full orders table with columns: Order ID, Customer, Phone, Garments, Total, Status, Date
   - Status badge with colors: RECEIVED=blue, PROCESSING=yellow, READY=green, DELIVERED=gray
   - Filter bar: search by name/phone, dropdown for status
   - Inline status update dropdown per row

4. CreateOrder.jsx (protected)
   - Form fields: customerName, phoneNumber
   - Dynamic garment rows: add/remove rows, each with garment type (dropdown), quantity
   - Price auto-fills from garment type selection using hardcoded config
   - Live total calculation shown below form
   - On success: show Order ID in a success toast, reset form

**ProtectedRoute.jsx:**
- If no token in localStorage → redirect to /login
- Wrap all non-auth pages with this

**Visual Style:**
- Dark mode: bg-gray-950 background, bg-gray-900 cards
- Accent color: indigo-500
- Subtle glassmorphism on cards: backdrop-blur-md bg-white/5 border border-white/10
- Framer Motion: animate={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }}
- Tailwind only — no external UI libraries

Generate files in this order: api.js → AuthContext → OrderContext → 
ProtectedRoute → MainLayout → pages (Login, Register, Dashboard, 
OrderHistory, CreateOrder) → App.jsx


PROMPT-3


Act as a Senior Software Engineer writing documentation for a portfolio 
project. Write a comprehensive README.md for a MERN stack dry cleaning 
order management system.

**Project Name:** LaundryFlow
**Tagline:** A lightweight order management system for dry cleaning stores, 
built with a MERN stack and AI-assisted development.

**Tech Stack:**
- Frontend: React, Tailwind CSS, Framer Motion, React Router v6, Axios
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- Auth: JWT
- Dev Tools: Claude AI, ChatGPT

**Features implemented:**
1. JWT-based auth (register/login)
2. Create orders with auto-generated Order ID and total billing calculation
3. Order status lifecycle: RECEIVED → PROCESSING → READY → DELIVERED
4. Filter orders by status, customer name, phone, garment type
5. Dashboard with total orders, revenue, and status breakdown
6. Estimated delivery date (auto-set to +3 days)
7. Protected frontend routes
8. Responsive dark-mode UI with glassmorphism

**Include these exact sections:**

1. Badges row (shields.io) for: React, Node.js, MongoDB, Express, TailwindCSS, JWT, License MIT

2. Table of Contents

3. High-Level Architecture
   - Explain: React Context API → Axios (with interceptors) → Express API → MongoDB
   - Mention JWT flow: login → token stored in localStorage → attached on every request
   - Note: no real-time (WebSockets skipped as a tradeoff)

4. API Documentation
   A clean markdown table per group (Auth, Orders, Dashboard):
   | Method | Endpoint | Auth | Description |

5. Database Schema
   Show both Mongoose models as code blocks (User and Order)

6. Getting Started
   - Prerequisites: Node 18+, MongoDB URI, .env setup
   - Show exact .env.example for both frontend and backend
   - Step-by-step: clone → install → env setup → run backend → run frontend

7. AI Usage Report (this section is critical — be specific)
   
   Sub-sections:
   a) Tools Used: Claude AI (architecture + prompts), ChatGPT (debugging)
   
   b) Sample Prompts Table:
   | Prompt # | Goal | Tool Used | Result |
   
   c) Where AI Helped Most:
      - Mongoose model boilerplate
      - Axios interceptor pattern
      - Context API structure
   
   d) Where AI Got It Wrong / What I Fixed:
      - List at least 4 specific bugs or issues (see below for real examples to include)
   
   Bug examples to document:
   - AI used req.user._id without null-checking middleware order (fix: moved auth middleware before controller)
   - AI generated estimatedDeliveryDate as a static string, not a JS Date object (fix: used new Date())
   - Axios interceptor caused infinite redirect loop on the /login page itself (fix: added pathname check before redirect)
   - AI forgot to add CORS configuration in server.js (fix: added cors middleware with origin from .env)

8. Tradeoffs & What I'd Improve
   
   Skipped:
   - WebSocket real-time updates
   - Role-based access (admin vs staff)
   - SMS notifications
   - Unit tests
   
   Would improve with more time:
   - Redis caching for dashboard stats
   - Pagination on order list
   - Deployment on Railway + Vercel

9. Folder Structure (tree view for both backend and frontend)

**Tone:** Professional but direct. Written as an engineer explaining 
decisions, not a salesperson. Avoid buzzwords like "robust" or "seamless".
Use plain language. Keep each section tight.


PROMPT-4

I'm building a MERN stack dry cleaning order management app. 
I have a bug. Here is the context:

**File:** [paste filename]
**What it should do:** [describe expected behavior]
**What is happening:** [describe actual behavior / error message]
**Relevant code:**
[paste the broken code block]

Rules for your fix:
1. Show me the fixed code only — not the whole file
2. Explain the root cause in 2 sentences max
3. If there's a better pattern I should use, mention it briefly
4. Do not refactor anything I didn't ask about

PROMPT-5

Generate a complete Postman collection JSON for a dry cleaning order 
management REST API. 

Base URL variable: {{base_url}} = http://localhost:8000

**Collection name:** LaundryFlow API

Include these folders and requests:

Folder: Auth
- POST /api/auth/register  
  Body: { "name": "Test User", "email": "test@test.com", "password": "password123" }
- POST /api/auth/login  
  Body: { "email": "test@test.com", "password": "password123" }
  → Add a test script that saves response token to collection variable: 
    pm.collectionVariables.set("token", pm.response.json().data.token)

Folder: Orders (all use Authorization: Bearer {{token}} header)
- POST /api/orders  
  Body: {
    "customerName": "Rahul",
    "phoneNumber": "9876543210",
    "garments": [
      { "type": "shirt", "quantity": 3, "pricePerItem": 50 },
      { "type": "saree", "quantity": 2, "pricePerItem": 120 }
    ]
  }
- GET /api/orders (no body)
- GET /api/orders?status=RECEIVED
- GET /api/orders?customerName=Rajesh
- GET /api/orders/:id
- PATCH /api/orders/:id/status  
  Body: { "status": "PROCESSING" }
- DELETE /api/orders/:id

Folder: Dashboard
- GET /api/dashboard

Output as valid Postman Collection v2.1 JSON that I can import directly.
