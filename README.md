# 🚚 TOMATO - Food Ordering Website

This repository hosts the source code for TOMATO, a dynamic food ordering website built with the MERN Stack. It offers a user-friendly platform for seamless online food ordering.
 
## 🔖 Quick Links / Deployment Status

| **Interface**                  | **Status**       | **URL**                                                                                                                  |
| ------------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
| **Client Frontend (User App)** | ✅ Deployed       | [https://food-delivery-frontend-s2l9.onrender.com/](https://food-delivery-frontend-s2l9.onrender.com/)                             |
| **Admin Frontend (Dashboard)** | ✅ Deployed    |  [https://food-delivery-admin-wrme.onrender.com/](https://food-delivery-admin-wrme.onrender.com/) |
|         
 
---

## 🚀 Features

- User Panel
- Admin Panel
- JWT Authentication
- Password Hashing with Bcrypt
- Stripe Payment Integration
- Login/Signup
- Logout
- Add to Cart
- Place Order
- Order Management
- Products Management
- Filter Food Products
- Login/Signup
- Authenticated APIs
- REST APIs
- Role-Based Identification
- Beautiful Alerts

## 📸 Screenshots

# 🏠 Home :
![Hero](https://i.ibb.co/59cwY75/food-hero.png)
 
# 🍔 Products :
![Products](https://i.ibb.co/JnNQPyQ/food-products.png)
 
# 🛒 Cart : 
![Cart](https://i.ibb.co/t2LrQ8p/food-cart.png)
- Cart Page

# 🔐 Login : 
![Login](https://i.ibb.co/s6PgwkZ/food-login.png)
- Login Popup

## 🚀 Run Locally — Step-by-step

Make sure you have Node.js (v20+ recommended) and npm installed.

### Clone the Repository

```bash
    git clone https://github.com/Mshandev/Food-Delivery
```
Go to the project directory

```bash
    cd Food-Delivery
```
Install dependencies (frontend)

```bash
    cd frontend
    npm install
```
Install dependencies (admin)

```bash
    cd admin
    npm install
```
Install dependencies (backend)

```bash
    cd backend
    npm install
```
Setup Environment Vaiables

```Make .env file in "backend" folder and store environment Variables
  JWT_SECRET=YOUR_SECRET_TEXT
  SALT=YOUR_SALT_VALUE
  MONGO_URL=YOUR_DATABASE_URL
  STRIPE_SECRET_KEY=YOUR_KEY
  ⚠️ Note: Do not commit your .env file. Create your own keys from Stripe Dashboard and use them locally.

 ```

Setup the Frontend and Backend URL
   - App.jsx in Admin folder
      const url = YOUR_BACKEND_URL
     
  - StoreContext.js in Frontend folder
      const url = YOUR_BACKEND_URL

  - orderController in Backend folder
      const frontend_url = YOUR_FRONTEND_URL 

Start the Backend server

```bash
    nodemon server.js
```

Start the Frontend server

```bash
    npm start
```

Start the Backend server

```bash
    npm start
```
## 🛠️ Tech Stack
* [React](https://reactjs.org/)
* [Node.js](https://nodejs.org/en)
* [Express.js](https://expressjs.com/)
* [Mongodb](https://www.mongodb.com/)
* [Stripe](https://stripe.com/)
* [JWT-Authentication](https://jwt.io/introduction)
* [Multer](https://www.npmjs.com/package/multer)



## ⚙️ Build & Deploy (quick notes)

**For each frontend** (client/admin):

```bash
cd client
npm run build
# upload build to your static host (Vercel, Netlify, Render static site, etc.)
```

**For server**: Deploy to Render/Heroku/Render Service. Make sure to set environment variables (MONGO_URI, JWT_SECRET, etc.) in the host dashboard.

**Render tips**:

* For client/admin, use static site deployment (build command `npm run build`, publish directory `build`).
* For server, set Start Command to: `npm start` (or use `npm run start:prod` depending on package.json)
* Add environment variables in Render web service settings.

---


## 🤝 Contributing

Contributions are always welcome!
Just raise an issue, and we will discuss it.

## 📜 Feedback

If you have any feedback, please reach out to me [here](https://www.linkedin.com/in/muhammad-shan-full-stack-developer/)
