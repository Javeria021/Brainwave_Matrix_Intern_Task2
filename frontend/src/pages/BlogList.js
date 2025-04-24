import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/BlogList.css';
import axios from 'axios';
import './SinglePost';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts'); // Update the route accordingly
        setPosts(res.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="blog-list">
      <h2>All Blog Posts</h2>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        posts.map(post => (
          <div className="blog-preview" key={post._id}>
            <h3>{post.title}</h3>
            <p>By: {post.author}</p>
            <Link to={`/posts/${post._id}`}>Read More</Link>
          </div>
        ))
      )}
    </div>
  );
};

export default BlogList;
