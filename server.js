const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Data Storage
let users = [];
let products = [
  {
    id: 1,
    name: "Laptop",
    price: 50000
  },
  {
    id: 2,
    name: "Phone",
    price: 20000
  },
  {
    id: 3,
    name: "Headphones",
    price: 3000
  }
];

let cart = [];
let orders = [];

// Home
app.get("/", (req, res) => {
  res.send("E-Commerce API Running");
});

// Register
app.post("/register", (req, res) => {
  const { username, password, role } = req.body;

  users.push({
    id: Date.now(),
    username,
    password,
    role: role || "user"
  });

  res.json({
    message: "User Registered"
  });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid Credentials"
    });
  }

  res.json({
    message: "Login Successful",
    role: user.role
  });
});

// Get Products
app.get("/products", (req, res) => {
  res.json(products);
});

// Add Product (Admin)
app.post("/products", (req, res) => {
  const product = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price
  };

  products.push(product);

  res.json(product);
});

// Add to Cart
app.post("/cart", (req, res) => {
  cart.push(req.body);

  res.json({
    message: "Added to Cart"
  });
});

// View Cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Checkout
app.post("/checkout", (req, res) => {
  const order = {
    id: Date.now(),
    items: cart
  };

  orders.push(order);
  cart = [];

  res.json({
    message: "Order Placed",
    order
  });
});

// View Orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});