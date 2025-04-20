const BlogPost = require('../models/BlogPost');

// Create Blog Post
const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const newPost = new BlogPost({
      title,
      content,
      author: req.body.userId, // userId passed from frontend or middleware
    });

    await newPost.save();

    res.status(201).json({
      message: 'Blog post created successfully',
      post: newPost,
    });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createPost,
};
