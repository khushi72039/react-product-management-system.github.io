const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "ecomm",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Database connected successfully");
  }
});


// ===============================
// GET ALL PRODUCTS
// ===============================
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
});


// ===============================
// ADD PRODUCT
// ===============================
app.post("/products", (req, res) => {
  const {
    name,
    price,
    description,
    availability,
  } = req.body;

  db.query(
    "INSERT INTO products (name, price, description, availability) VALUES (?, ?, ?, ?)",
    [name, price, description, availability],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Product added successfully!",
      });
    }
  );
});


// ===============================
// UPDATE PRODUCT
// ===============================
app.put("/products/:id", (req, res) => {
  const productId = req.params.id;

  const {
    name,
    price,
    description,
    availability,
  } = req.body;

  db.query(
    "UPDATE products SET name = ?, price = ?, description = ?, availability = ? WHERE id = ?",
    [
      name,
      price,
      description,
      availability,
      productId,
    ],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json({
        message: "Product updated successfully!",
      });
    }
  );
});


// ===============================
// DELETE PRODUCT
// ===============================
app.delete("/products/:id", (req, res) => {
  const productId = req.params.id;

  db.query(
    "DELETE FROM products WHERE id = ?",
    [productId],
    (err) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Product deleted successfully!",
      });
    }
  );
});


// ===============================
// START SERVER
// ===============================
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});