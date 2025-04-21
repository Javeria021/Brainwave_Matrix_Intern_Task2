const express = require("express");
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost
} = require("../controllers/blogPostController");
const protect = require("../middleware/authMiddleware");

// Create a blog post (with authentication)
router.post("/create", protect, createPost);

// Get all blog posts
router.get("/", getAllPosts);

// Get a blog post by ID
router.get("/:id", getPostById);

// Update a blog post
router.put("/:id", protect, updatePost);

// Delete a blog post
router.delete("/:id", protect, deletePost);

module.exports = router;
