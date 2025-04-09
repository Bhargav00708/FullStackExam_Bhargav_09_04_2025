# 🛍️ Full-Stack E-Commerce App

A full-stack e-commerce platform built with:

- **Frontend**: Next.js 15 (App Router) + TypeScript
- **Backend**: Node.js + Express
- **Databases**: PostgreSQL (Users, Orders), MongoDB (Products)
- **Authentication**: JWT
- **ORM/ODM**: Sequelize (Postgres), Mongoose (MongoDB)
- **Styling**: Tailwind CSS

---

## 📁 Project Structure

```
E-commerce/
├── backend/         # Express backend (API + DB)
└── frontend/        # Next.js frontend
```

---

## 🔧 Backend Setup

### Prerequisites:
- Node.js
- MongoDB (local or Mongo atlas)
- PostgreSQL (local or Supabase)

### 1. Install dependencies:
```bash
cd backend
npm install
```

### 2. Environment Variables:
Create a `.env` file inside `backend/`:

```env
PORT=your_port
MONGO_URI=your_mongo_uri
SQL_DB=your_postgres_db
SQL_USER=your_postgres_user
SQL_PASS=your_postgres_password
SQL_HOST=localhost
JWT_SECRET=your_jwt_secret
```

### 3. Run backend server:
```bash
npm start
```

Server runs at: `http://localhost:5000`

---

## 🌐 Frontend Setup

### 1. Install dependencies:
```bash
cd frontend
npm install
```

### 2. Environment Variables:
Create a `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_API_URL=API_URL
```

### 3. Run frontend dev server:
```bash
npm run dev
```

---

## ✅ Features

- 🔐 User Registration & Login (JWT-based)
- 📦 Products listing (MongoDB)
- 🛒 Add to Cart & Checkout
- 📜 Order History (PostgreSQL)
- 📄 SSR, SSG & ISR with App Router
- ⚙️ Protected routes (JWT middleware)
- 📁 Clean MVC backend structure

---

## 🚀 Deployment

You can deploy each part individually:

### Frontend
- **Vercel** or **Netlify**
- Set root to `frontend/`

### Backend
- **Render**, **Railway**, or **Fly.io**
- Set root to `backend/`
- Don’t forget to add `.env` values in your deployment settings

---

## 🧪 Testing the App

1. Register/Login from frontend.
2. Browse products.
3. Add items to cart.
4. Place an order (only for authenticated users).
5. View order history.

---

## 📌 Author

Made with 💖 by Bhargav  

---