# 🛒 E-Commerce REST API

A robust and modular E-Commerce backend system built with **Node.js**, **Express**, and **MongoDB**. This API is designed for scalability and clean code architecture, supporting all core features needed for an online store including authentication, product management, orders, and real-time operations.

---

## 📌 Table of Contents

- [Features](#️-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [Environment Variables](#-environment-variables)
- [Testing](#-testing)
- [License](#-license)
- [Author](#-author)


---

## ✅ Features

- 🔐 JWT Authentication (Login, Register, Role-based Access)
- 🛍️ Product CRUD with validation and image handling
- 📦 Order creation, status management, and cart integration
- 👥 User profile & address book management
- 📩 Email notifications using templates
- ⏰ Cron jobs for background tasks
- 🧪 Unit and Integration Testing using Jest
- ⚙️ Environment-based config setup
- ✨ Clean and scalable project architecture (MVC + Services)

---

## 💻 Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, Bcrypt
- **Testing**: Jest
- **Validation**: Joi
- **Dev Tools**: ESLint, Babel, VSCode config

---

## 📁 Project Structure

```
src/
├── config/         → App-level config & DB connection
├── controllers/    → Route handlers
├── cron/           → Background scheduled tasks
├── helpers/        → Utility functions
├── middleware/     → Auth, error handling, logging
├── models/         → Mongoose schemas
├── routes/         → Express routers
├── services/       → Business logic layer
├── templates/      → Email templates
├── utils/          → Common reusable logic
├── validators/     → Joi-based request validation
└── server.js       → Application entry point
```

---

## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root and add:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret
EMAIL_HOST=smtp.example.com
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4. Run the Server

```bash
npm run start
# or
npm run dev
```

---

## 🔌 API Endpoints

| Method | Endpoint             | Description                 | Access        |
--------|----------------------|-----------------------------|---------------|
| POST   | `/auth/register`     | Register new user           | Public        |
| POST   | `/auth/login`        | Login user                  | Public        |
| GET    | `/products`          | Get all products            | Public        |
| POST   | `/products`          | Create new product          | Admin Only    |
| PUT    | `/products/:id`      | Update product              | Admin Only    |
| POST   | `/orders`            | Create a new order          | Authenticated |
| GET    | `/orders/:id`        | View order details          | Authenticated |
| POST   | `/payment/create`       | Initiate a new payment session    | Authenticated |
| POST   | `/payment/webhook`      | Stripe webhook for status updates| Public        |
| GET    | `/payment/status/:id`   | Retrieve payment status by ID     | Authenticated |

---

## 🌐 Environment Variables

| Variable       | Description                         |
|----------------|-------------------------------------|
| PORT           | Server running port                 |
| MONGODB_URI    | MongoDB connection string           |
| JWT_SECRET     | JWT signing secret                  |
| EMAIL_HOST     | SMTP host for sending emails        |
| EMAIL_USER     | SMTP user                           |
| EMAIL_PASS     | SMTP password or app token          |

---

## 🧪 Testing

To run all unit and integration tests:

```bash
npm test
```

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 👨‍💻 Author

**Monish Reddy Bonthu**

- [GitHub](https://github.com/MonishReddyDev)
- [LinkedIn](https://linkedin.com/in/monish-reddy-bonthu)
- [Portfolio](https://your-portfolio-url.com)

---

## ⭐️ Feedback

If you found this helpful or want to suggest improvements, feel free to create an issue or pull request.


