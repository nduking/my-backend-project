# E-commerce-Backend

This is a Node.js RESTful API for a furniture e-commerce platform. It handles user registration, login, profile access, and product management with filtering, pagination, and search capabilities.

##  Features

- User Registration & Login with JWT Authentication
- Secure Password Hashing using bcrypt
- Protected User Profile Route
- Product Listing with:
  - Category filtering
  - Price range filtering
  - Stock availability
  - Full-text search
  - Pagination and sorting
- MongoDB models for Users and Products
- Middleware for route protection

---

##  Tech Stack

- **Node.js** + **Express**
- **MongoDB** + **Mongoose**
- **JWT** for authentication
- **bcryptjs** for password hashing

---

##  Project Structure

├── controllers/
│ └── authController.js
├── middleware/
│ └── Auth.js
├── models/
│ ├── user.model.js
│ └── Product.models.js
├── routes/
│ ├── Auth.js
│ └── Product.js
├── .env
├── server.js

---

##  Authentication

### Register

`POST /api/register`

**Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}

Login
POST /api/login

Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}


Get Profile
GET /api/profile

Headers:

Authorization: Bearer <JWT_TOKEN>

Products
Get All Products
GET /api/products

Query Parameters:

page (default: 1)

limit (default: 12)

category

minPrice

maxPrice

inStock (true/false)

search (text search)

sortBy (e.g., price, createdAt)

sortOrder (asc/desc)

Create Product
POST /api/products/create-product

Headers:

Authorization: Bearer <JWT_TOKEN>
```
