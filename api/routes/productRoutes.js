const express = require("express");
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getFarmerProducts,
} = require("../controllers/productController");
const { verifyToken, isFarmer } = require("../utils/authMiddleware");

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProduct);

// Farmer routes
router.post("/", verifyToken, isFarmer, createProduct);
router.put("/:id", verifyToken, isFarmer, updateProduct);
router.delete("/:id", verifyToken, isFarmer, deleteProduct);
router.get("/farmer/me", verifyToken, isFarmer, getFarmerProducts);

module.exports = router;
