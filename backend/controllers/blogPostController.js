const BlogPost = require("../models/BlogPost");

//  Create Blog Post
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new BlogPost({ title, content, author });
    await newPost.save();
    res.status(201).json({
      message: "Blog post created successfully",
      post: newPost
    });
  } catch (error) {
    console.error("Error creating blog post:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  Get All Blog Posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch posts' });
  }
};

//  Get Single Blog Post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching the post' });
  }
};

// Update Blog Post
exports.updatePost = async (req, res) => {
  try {
    const updatedPost = await BlogPost.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      message: "Post updated successfully",
      post: updatedPost
    });
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

//  Delete Blog Post
exports.deletePost = async (req, res) => {
  try {
    const deletedPost = await BlogPost.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
