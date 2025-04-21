import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="main-header">
      <h1 className="site-title">Blogify</h1>
      <nav>
        <Link to="/login" className="nav-btn">Login</Link>
        <Link to="/register" className="nav-btn">Sign Up</Link>
      </nav>
    </header>
  );
};

export default Header;
