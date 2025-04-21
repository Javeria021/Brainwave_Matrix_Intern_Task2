import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../pages/Styles/BlogList.css';
import { Link } from 'react-router-dom';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="blog-list">
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No blog posts found.</p>
      ) : (
        posts.map((post) => (
          <Link to={`/post/${post._id}`} key={post._id} className="blog-card-link">
            <div className="blog-card">
              <h3>{post.title}</h3>
              <p>{post.content.slice(0, 100)}...</p>
              <p className="author">By: {post.author}</p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default BlogList;
