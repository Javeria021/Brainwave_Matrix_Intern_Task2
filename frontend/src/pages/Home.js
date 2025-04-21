import React from 'react';
import { Link } from 'react-router-dom';
import '../pages/Styles/Home.css';

const Home = () => {
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
            <img src="https://plus.unsplash.com/premium_photo-1661963874418-df1110ee39c1?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Tech Theme" />
            <h3>Tech Talk</h3>
          </div>
          <div className="theme-card">
            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f" alt="Lifestyle Theme" />
            <h3>Lifestyle Journal</h3>
          </div>
          <div className="theme-card">
            <img src="https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Lifestyle Theme" />
            <h3>Fitness Tips</h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
