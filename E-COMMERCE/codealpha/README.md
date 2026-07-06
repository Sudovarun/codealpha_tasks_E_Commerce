# 🛒 NovaTech Store — E-Commerce Platform

A full-stack e-commerce platform for premium tech and lifestyle products. Built with **Express.js** (Node) and **FastAPI** (Python) backends, a vanilla **HTML/CSS/JS** SPA frontend, and **SQLite** for persistence.

> **Internship Project** — CodeAlpha

---

## ✨ Features

| Area | Details |
|---|---|
| **Product Catalog** | Browse 6 curated tech products across Peripherals, Audio, Displays & Lifestyle categories |
| **Category Filtering** | Filter products by category from the navbar or footer links |
| **Product Details** | Detailed specs, options (color/switch variants), ratings, reviews, and stock status |
| **User Authentication** | Register & log in with JWT-based session management |
| **Shopping Cart** | Client-side cart with add/remove/quantity controls and persistent badge count |
| **Checkout & Orders** | Place orders with shipping address, view order history with item details |
| **Workspace Bundle Discount** | ₹1,500 off when ordering a Keyboard + Monitor + Utility item together |
| **Free Shipping** | Orders over ₹2,000 ship free across India |
| **Dark / Light Theme** | Toggle between dark and light mode with a single click |
| **Responsive Design** | Mobile-friendly layout with glassmorphism, ambient gradients, and micro-animations |
| **Toast Notifications** | Real-time feedback for cart actions, auth events, and order placement |
| **SPA Routing** | Hash-based client-side routing (no page reloads) |

---

## 🏗️ Tech Stack

### Frontend
- **HTML5** — Semantic markup with SEO meta tags
- **CSS3** — Vanilla CSS with CSS custom properties, glassmorphism, gradients, and animations
- **JavaScript** — Vanilla JS SPA with hash-based routing
- **Google Fonts** — Inter & Outfit typefaces

### Backend (Node.js — primary)
- **Express.js** — REST API server
- **SQLite3** — Lightweight embedded database
- **bcryptjs** — Password hashing
- **jsonwebtoken** — JWT authentication
- **cors** — Cross-origin resource sharing

### Backend (Python — alternative)
- **FastAPI** — Async REST API server
- **Uvicorn** — ASGI server
- **PyJWT** — JWT authentication
- **bcrypt** — Password hashing
- **Pydantic** — Request validation

---

## 📁 Project Structure

```
codealpha/
├── public/                  # Frontend (served as static files)
│   ├── index.html           # Main SPA entry point
│   ├── styles.css           # Complete stylesheet (themes, components, animations)
│   └── app.js               # Client-side application logic & routing
├── server.js                # Node.js / Express backend
├── server.py                # Python / FastAPI backend (alternative)
├── db.js                    # Database initialization, seeding & query helpers
├── database.sqlite          # SQLite database file (auto-created on first run)
├── package.json             # Node.js dependencies & scripts
├── package-lock.json        # Lockfile
└── README.md                # This file
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ and **npm** (for the Node backend)
- **Python** 3.9+ (only if using the FastAPI backend)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd E-COMMERCE/codealpha
```

### 2a. Run with Node.js (Recommended)

```bash
# Install dependencies
npm install

# Start the development server (with file watching)
npm run dev

# — OR — start without watching
npm start
```

The server starts at **http://localhost:3000**.

### 2b. Run with Python (Alternative)

```bash
# Install Python dependencies
pip install fastapi uvicorn pyjwt bcrypt

# Start the server
python server.py
```

The server starts at **http://localhost:3000**.

> **Note:** Both backends share the same `database.sqlite` file. The Node.js backend (`db.js`) handles table creation and product seeding automatically on first run. If using the Python backend, run the Node server once first to initialize the database, or initialize it manually.

---

## 🔌 API Reference

All endpoints are prefixed with `/api`.

### Authentication

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | ✗ | Create a new user account |
| `POST` | `/api/auth/login` | ✗ | Log in and receive a JWT |
| `GET` | `/api/auth/me` | ✔ | Get the authenticated user's profile |

#### Register — `POST /api/auth/register`
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

#### Login — `POST /api/auth/login`
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

### Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/api/products` | ✗ | List all products (optional `?category=` filter) |
| `GET` | `/api/products/:id` | ✗ | Get a single product's details |

### Orders

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/api/orders` | ✔ | Place a new order |
| `GET` | `/api/orders` | ✔ | Get the authenticated user's order history |

#### Place Order — `POST /api/orders`
```json
{
  "items": [
    { "productId": 1, "quantity": 1 },
    { "productId": 4, "quantity": 2 }
  ],
  "shippingAddress": "123 MG Road, Bengaluru, Karnataka 560001"
}
```

> **Auth header:** `Authorization: Bearer <jwt_token>`

---

## 🗄️ Database Schema

```
┌──────────────┐       ┌──────────────────┐
│    users     │       │     products     │
├──────────────┤       ├──────────────────┤
│ id (PK)      │       │ id (PK)          │
│ username     │       │ name             │
│ email        │       │ description      │
│ password_hash│       │ price            │
│ created_at   │       │ image_url        │
└──────┬───────┘       │ category         │
       │               │ stock            │
       │               │ rating           │
       │               │ review_count     │
       │               │ specifications   │
       │               │ options          │
       │               └────────┬─────────┘
       │                        │
       ▼                        ▼
┌──────────────┐       ┌──────────────────┐
│    orders    │       │   order_items    │
├──────────────┤       ├──────────────────┤
│ id (PK)      │◄──────│ id (PK)          │
│ user_id (FK) │       │ order_id (FK)    │
│ total_amount │       │ product_id (FK)  │
│ status       │       │ quantity         │
│ shipping_addr│       │ price            │
│ created_at   │       └──────────────────┘
└──────────────┘
```

---

## 🎨 Design Highlights

- **Glassmorphism UI** — Frosted-glass cards with backdrop blur effects
- **Ambient Gradients** — Floating gradient orbs for a modern, dynamic feel
- **Dark / Light Modes** — Full theme support via CSS custom properties
- **Micro-animations** — Smooth hover effects, floating cards, and transitions
- **Google Fonts** — Inter for body text, Outfit for headings
- **Responsive** — Mobile-first layout that scales up to desktop

---

## 🛡️ Environment Variables

| Variable | Default | Description |
|---|---|---|
| `PORT` | `3000` | Server port |
| `JWT_SECRET` | `novatech-super-secret-key-123456` | Secret key for JWT signing |

> ⚠️ **Production:** Always set a strong, unique `JWT_SECRET` environment variable.

---

## 📜 License

This project was built as part of the **CodeAlpha** internship program.

---

<p align="center">
  Made with ❤️ by <strong>NovaTech</strong>
</p>
