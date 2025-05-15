const express = require("express");
const {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { verifyToken, isAdmin } = require("../utils/authMiddleware");
const router = express.Router();

// Public routes
router.get("/", getAllCategories);
router.get("/:id", getCategory);

// Admin routes
router.post("/", verifyToken, isAdmin, createCategory);
router.put("/:id", verifyToken, isAdmin, updateCategory);
router.delete("/:id", verifyToken, isAdmin, deleteCategory);

module.exports = router;
