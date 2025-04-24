const express = require('express');
const router = express.Router();
const { createPost, getAllPosts, getPostById, updatePost, deletePost } = require('../controllers/blogController');
const protect = require('../middleware/authMiddleware'); // ✅ Import middleware

// @route POST /api/blogs/create
router.post('/create', protect, createPost);

// @route GET /api/blogs
router.get('/', getAllPosts);

// @route GET /api/blogs/:id
router.get('/:id', getPostById);

// @route PUT /api/blogs/:id
router.put('/:id', protect, updatePost);

// @route DELETE /api/blogs/:id
router.delete('/:id', protect, deletePost);

module.exports = router;
