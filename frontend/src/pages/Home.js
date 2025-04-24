import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../pages/Styles/Home.css';
import axios from 'axios';

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts'); // adjust the URL if needed
        setBlogs(res.data);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Blogify</h1>
          <p>Start sharing your thoughts with the world!</p>
          <Link to="/create-post" className="start-blog-btn">Start Your Own Blog</Link>
        </div>
      </header>

      <section className="theme-preview-section">
        <h2>Explore Blog Themes</h2>
        <div className="themes-container">
          <div className="theme-card">
            <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" alt="Nature Theme" />
            <h3>Nature Vibes</h3>
          </div>
          <div className="theme-card">
            <img src="https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop" alt="Tech Theme" />
            <h3>Tech Talk</h3>
          </div>
          <div className="theme-card">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Lifestyle Theme" />
            <h3>Lifestyle Journal</h3>
          </div>
          <div className="theme-card">
            <img src="https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?q=80&w=2071&auto=format&fit=crop" alt="Fitness Theme" />
            <h3>Fitness Tips</h3>
          </div>
        </div>
      </section>

      <section className="blog-list-section">
        <h2>Latest Blogs</h2>
        {blogs.length === 0 ? (
          <p>No blog posts found.</p>
        ) : (
          blogs.map((blog) => (
            <div key={blog._id} className="blog-card">
              <h3>{blog.title}</h3>
              <p>{blog.content.substring(0, 100)}...</p>
              <p className="author">By: {blog.author}</p>
              <Link to={`/posts/${blog._id}`}>Read More</Link>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default Home;
