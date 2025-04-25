const BlogPost = require('../models/BlogPost');

// Create
const createPost = async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const newPost = new BlogPost({
      title,
      content,
      author: req.user.username, 
      user: req.user._id,
    });

    await newPost.save();
    res.status(201).json({ message: 'Blog post created successfully', post: newPost });
  } catch (error) {
    console.error('Create Post Error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Read All
const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

// Read Single
const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch post' });
  }
};

// Update
const updatePost = async (req, res) => {
  try {
    const updated = await BlogPost.findByIdAndUpdate(
      req.params.id,
      { title: req.body.title, content: req.body.content },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update post' });
  }
};

// Delete
const deletePost = async (req, res) => {
  try {
    await BlogPost.findByIdAndDelete(req.params.id);
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete post' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
