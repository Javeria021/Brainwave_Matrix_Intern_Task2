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

// Create a blog post
router.post("/create", createPost);

// Get all blog posts
router.get("/", getAllPosts);

// Get a blog post by ID
router.get("/:id", getPostById);

// Update a blog post
router.put("/:id", updatePost);

// Delete a blog post
router.delete("/:id", deletePost);

router.post("/create", protect, createPost);

module.exports = router;
