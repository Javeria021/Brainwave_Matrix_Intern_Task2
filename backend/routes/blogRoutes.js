const express = require('express');
const router = express.Router();
const { createPost } = require('../controllers/blogController');

// POST /api/blogs - Create a new blog post
router.post('/', createPost);

module.exports = router;
