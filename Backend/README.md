# 🎓 UniSync Backend API

> Production-ready Node.js + Express + MongoDB backend for the UniSync Smart Campus Assistant.

---

## 🚀 Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
```bash
cp .env.example .env
```
Edit `.env` and fill in your values:
```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/unisync
JWT_SECRET=your_super_secret_key_min_32_chars
NODE_ENV=development
```

### 3. Run the server
```bash
# Development (with hot reload)
npm run dev

# Production
npm start
```

---

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                  # MongoDB connection
├── controllers/
│   ├── authController.js      # Register, login, get me
│   ├── userController.js      # Profile CRUD
│   └── moduleController.js    # Module CRUD
├── models/
│   ├── User.js                # User schema (with bcrypt hook)
│   └── Module.js              # Module schema (assignments + resources)
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── moduleRoutes.js
├── middleware/
│   ├── authMiddleware.js      # JWT protect middleware
│   └── errorMiddleware.js     # 404 + global error handler
├── utils/
│   └── generateToken.js       # JWT generation helper
├── app.js                     # Express app setup
├── server.js                  # Entry point
└── .env.example
```

---

## 📡 API Reference

### Base URL: `http://localhost:5000`

---

### 🔑 Auth Routes — `/api/auth`

| Method | Endpoint    | Access  | Description               |
|--------|-------------|---------|---------------------------|
| POST   | `/register` | Public  | Create a new account      |
| POST   | `/login`    | Public  | Login and receive JWT     |
| GET    | `/me`       | Private | Get current user info     |

**Register body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123",
  "university": "MIT",
  "year": 2,
  "semester": 3
}
```

**Login body:**
```json
{
  "email": "jane@example.com",
  "password": "password123"
}
```

---

### 👤 User Routes — `/api/users` (All Protected)

| Method | Endpoint   | Description              |
|--------|------------|--------------------------|
| GET    | `/profile` | Get full user profile    |
| PUT    | `/profile` | Update profile details   |

---

### 📚 Module Routes — `/api/modules` (All Protected)

| Method | Endpoint | Description                    |
|--------|----------|--------------------------------|
| POST   | `/`      | Create a new module            |
| GET    | `/`      | Get all modules for the user   |
| GET    | `/:id`   | Get a specific module          |
| PUT    | `/:id`   | Update a module                |
| DELETE | `/:id`   | Delete a module                |

**Create module body:**
```json
{
  "moduleName": "Advanced Algorithms",
  "code": "CS401",
  "lecturer": "Dr. Smith",
  "progress": 35,
  "assignments": [
    {
      "title": "Assignment 1",
      "dueDate": "2025-03-15",
      "status": "pending"
    }
  ],
  "resources": [
    {
      "title": "Lecture Slides",
      "url": "https://example.com/slides.pdf",
      "type": "pdf"
    }
  ]
}
```

---

## 🔒 Authentication

All protected routes require a Bearer token in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens expire after **30 days**.

---

## ⚠️ HTTP Status Codes

| Code | Meaning               |
|------|-----------------------|
| 200  | OK                    |
| 201  | Created               |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 404  | Not Found             |
| 500  | Internal Server Error |

---

## 🏥 Health Check

```
GET /api/health
```

Returns server status, environment, and timestamp.

---

## 🔗 Connecting to React Frontend

Install `axios` in your React project and set a base URL:

```javascript
// src/api/axiosConfig.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
```
