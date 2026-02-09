# Naksh Jewels - E-commerce Platform

A full-stack e-commerce application for jewelry shopping built with modern web technologies. This project demonstrates clean architecture, professional coding practices, and DevOps fundamentals.

## 📋 Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development Setup](#local-development-setup)
  - [Docker Setup](#docker-setup)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Development Guidelines](#development-guidelines)

---

## 🛠 Tech Stack

### Frontend
- **React 18.2** - UI library with functional components
- **Redux Toolkit** - State management
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Pure CSS/CSS Modules** - Styling (no UI frameworks)

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **Express Validator** - Input validation
- **dotenv** - Environment configuration

---

## ✨ Features

### Product Catalog
- Browse jewelry products with high-quality images
- Filter by category (Rings, Necklaces, Bracelets, Earrings, Pendants)
- Responsive grid layout
- Product details with pricing in INR

### Shopping Cart
- Add products to cart with instant feedback
- Update item quantities (1-99)
- Remove individual items
- Clear entire cart
- Real-time total calculation
- Session persistence via MongoDB
- Tax calculation (3%)

### State Management
- Redux Toolkit for predictable state updates
- Session-based cart persistence
- Optimistic UI updates with API sync

### Responsive Design
- Mobile-first approach
- Breakpoints: 480px, 640px, 768px, 1024px
- Touch-friendly controls
- Optimized images

---

## 🏗 Architecture

### Frontend Architecture
```
src/
├── components/          # Reusable UI components
│   ├── Header/         # Navigation with cart badge
│   ├── ProductCard/    # Product display card
│   ├── Cart/           # Cart item component
│   └── Loader/         # Loading spinner
├── pages/              # Route-level components
│   ├── ProductListing/ # Main products page
│   └── CartPage/       # Shopping cart page
├── redux/              # State management
│   ├── slices/         # Redux slices (cart, products)
│   └── store/          # Store configuration
├── utils/              # Helper functions
│   ├── api.js          # Axios instance
│   └── helpers.js      # Formatting utilities
└── styles/             # Global styles
```

### Backend Architecture (MVC Pattern)
```
src/
├── routes/             # API route definitions
├── controllers/        # Business logic
├── models/             # Mongoose schemas
├── middleware/         # Custom middleware
│   ├── validation.js   # Input validation
│   └── errorHandler.js # Error handling
├── config/             # Configuration
│   └── database.js     # MongoDB connection
└── utils/              # Utility functions
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** v18+ and npm
- **MongoDB** v7.0+ (or use Docker)
- **Docker** and Docker Compose (for containerized setup)

---

### Local Development Setup

#### 1. Clone the Repository
```bash
git clone <repository-url>
cd naksh-jewels
```

#### 2. Backend Setup
```bash
cd backend

# Install dependencies
npm install

# Create .env file (already exists in project)
# Verify these settings in .env:
# PORT=5000
# NODE_ENV=development
# MONGODB_URI=mongodb://localhost:27017/naksh_jewels
# CLIENT_URL=http://localhost:3000

# Make sure MongoDB is running locally, then start the server
npm start

# In a separate terminal, seed the database with products
curl -X POST http://localhost:5000/api/products/seed
```

The backend will run on `http://localhost:5000`

**Available Backend Scripts:**
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon

#### 3. Frontend Setup
```bash
# Open a new terminal
cd frontend

# Install dependencies
npm install

# Create .env file (already exists in project)
# Verify this setting in .env:
# REACT_APP_API_URL=http://localhost:5000/api

# Start the development server
npm start
```

The frontend will run on `http://localhost:3000`

**Available Frontend Scripts:**
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests

---

#### 3. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: localhost:27017


## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Products

##### GET /products
Get all products with optional filtering

**Query Parameters:**
- `category` (optional) - Filter by category
- `inStock` (optional) - Filter by stock status (true/false)

**Response:**
```json
{
  "success": true,
  "count": 12,
  "data": [
    {
      "id": "prod_001",
      "name": "Diamond Solitaire Ring",
      "price": 45000,
      "image": "https://...",
      "description": "Elegant 18K gold ring with 1 carat diamond",
      "category": "Rings",
      "inStock": true
    }
  ]
}
```

##### GET /products/:id
Get single product by ID

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "prod_001",
    "name": "Diamond Solitaire Ring",
    ...
  }
}
```

##### POST /products/seed
Seed database with initial products (development only)

**Response:**
```json
{
  "success": true,
  "message": "Database seeded successfully",
  "count": 12
}
```

#### Cart

**Note:** All cart endpoints require `x-session-id` header (automatically handled by frontend)

##### GET /cart
Get cart items for current session

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "productId": "prod_001",
        "quantity": 2,
        "product": { ... }
      }
    ],
    "sessionId": "session_123"
  }
}
```

##### POST /cart
Add item to cart

**Request Body:**
```json
{
  "productId": "prod_001",
  "quantity": 1
}
```

**Validation Rules:**
- `productId`: Required, must be a string
- `quantity`: Required, integer between 1-99

**Response:**
```json
{
  "success": true,
  "message": "Item added to cart successfully",
  "data": { ... }
}
```

##### PUT /cart/:productId
Update item quantity

**Request Body:**
```json
{
  "quantity": 3
}
```

**Response:**
```json
{
  "success": true,
  "message": "Cart updated successfully",
  "data": { ... }
}
```

##### DELETE /cart/:productId
Remove item from cart

**Response:**
```json
{
  "success": true,
  "message": "Item removed from cart",
  "data": { ... }
}
```

##### DELETE /cart
Clear entire cart

**Response:**
```json
{
  "success": true,
  "message": "Cart cleared successfully"
}
```

### Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [...]  // For validation errors
}
```

**Common Status Codes:**
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation errors)
- `404` - Not Found
- `500` - Internal Server Error

---

## 📁 Project Structure

```
naksh-jewels/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header/
│   │   │   │   ├── Header.jsx
│   │   │   │   └── Header.module.css
│   │   │   ├── ProductCard/
│   │   │   │   ├── ProductCard.jsx
│   │   │   │   └── ProductCard.module.css
│   │   │   ├── Cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   └── Cart.module.css
│   │   │   └── Loader/
│   │   │       ├── Loader.jsx
│   │   │       └── Loader.module.css
│   │   ├── pages/
│   │   │   ├── ProductListing/
│   │   │   │   ├── ProductListing.jsx
│   │   │   │   └── ProductListing.module.css
│   │   │   └── CartPage/
│   │   │       ├── CartPage.jsx
│   │   │       └── CartPage.module.css
│   │   ├── redux/
│   │   │   ├── slices/
│   │   │   │   ├── cartSlice.js
│   │   │   │   └── productsSlice.js
│   │   │   └── store/
│   │   │       └── store.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   └── helpers.js
│   │   ├── styles/
│   │   │   └── index.css
│   │   ├── App.js
│   │   └── index.js
│   ├── nginx.conf
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   └── package.json
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── Product.js
│   │   │   └── Cart.js
│   │   ├── controllers/
│   │   │   ├── productController.js
│   │   │   └── cartController.js
│   │   ├── routes/
│   │   │   ├── productRoutes.js
│   │   │   └── cartRoutes.js
│   │   ├── middleware/
│   │   │   ├── validation.js
│   │   │   └── errorHandler.js
│   │   └── server.js
│   ├── data/
│   │   └── products.json
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── .env
│   └── package.json
│
├── docker-compose.yml
└── README.md
```

---


**CORS Errors**
- Ensure `CLIENT_URL` in backend `.env` matches frontend URL
- Check that backend is running on the correct port

**Products Not Loading**
```bash
# Seed the database
curl -X POST http://localhost:5000/api/products/seed
```

---

## 📄 License

This project is created for educational and demonstration purposes.

---

## 👤 Author

**Naksh Jewels Development Team**

For questions or feedback, please open an issue in the repository.

---

## 🙏 Acknowledgments

- Product images from Unsplash
- Icons using Unicode emojis for zero dependencies
- Modern CSS techniques for responsive design