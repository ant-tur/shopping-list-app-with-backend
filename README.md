# 🛒 Shopping List App (Fullstack)

A fullstack shopping list application with a **React frontend** (served from `dist/`) and a **Node.js + Express + MongoDB backend**.
Users can add, edit, check off, and delete products from their shopping list.

---

## 💡 Features

- ➕ Add products with name and amount
- ✅ Mark products as bought (checkbox → item gets crossed out)
- ✏️ Edit product name or amount
- 🗑 Delete products instantly
- 🔔 Temporary feedback messages (added, updated, deleted)
- 🌐 RESTful API with MongoDB for persistent storage
- 🎨 React frontend served as static files from `dist/`

---

## 🔧 Tech Stack

- **Frontend:** React (Hooks, Vite build), Axios, CSS
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **Tools:** Morgan (logging), dotenv (env variables)

---

## 📂 Project Structure

```text
shopping-list-backend/
├── controllers/
│   └── products.js      # Routes & controllers for products
├── dist/                # Compiled React frontend (served by Express)
├── models/
│   └── product.js       # Mongoose schema
├── utils/
│   ├── config.js        # Configuration (env variables, DB URI)
│   ├── logger.js
│   └── middleware.js    # Error handlers & middleware
├── .env                 # Environment variables
├── .gitignore
├── app.js               # Express app setup
├── index.js             # Entry point (server start)
├── package.json
└── README.md
```

---

## 🚀 Getting Started

1. **Clone the repository**

   ```bash
   git clone https://github.com/ant-tur/shopping-list-app-with-backend
   cd shopping-list-app-with-backend
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the project root with:

   ```env
   PORT=3001
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the server (development)**

   ```bash
   npm run dev
   ```

- The server will be available at **http://localhost:${PORT}** (default: `3001`).
- The **frontend UI** is served from `dist/` at the root path (`/`).
- The **API** is available under `/api` (see endpoints below).

---

## 📡 API Endpoints

### Get all products

`GET /api/products`

**Response 200**

```json
[
  { "id": "664f...", "name": "Milk", "amount": 2, "checked": false },
  { "id": "6650...", "name": "Bread", "amount": 1, "checked": true }
]
```

### Get product by ID

`GET /api/products/:id`

**Response 200**

```json
{ "id": "664f...", "name": "Milk", "amount": 2, "checked": false }
```

### Create new product

`POST /api/products`

**Request body**

```json
{ "name": "Milk", "amount": 2 }
```

**Response 201**

```json
{ "id": "664f...", "name": "Milk", "amount": 2, "checked": false }
```

### Update product

`PUT /api/products/:id`

**Request body (any editable fields)**

```json
{ "name": "Milk 2%", "amount": 3, "checked": true }
```

**Response 200**

```json
{ "id": "664f...", "name": "Milk 2%", "amount": 3, "checked": true }
```

### Delete product

`DELETE /api/products/:id`

**Response 204** — no content

---

## 🧩 Development Notes

- The **frontend build** is stored in `dist/` and is served by Express via `express.static`.
- If you update the frontend in a separate project, rebuild it and replace this folder:
  ```bash
  cp -r path-to-frontend/dist ./dist
  ```

---

## 🔗 Live Demo

👉 [Live Demo](https://shopping-list-app-with-backend.onrender.com/)

---

## 📜 License

MIT License — free to use, modify, and distribute.
