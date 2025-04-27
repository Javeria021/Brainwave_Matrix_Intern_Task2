import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

const Header = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <header className="main-header">
      <h1 className="site-title">Blogify</h1>
      <nav>
        {!user ? (
          <>
            <Link to="/login" className="nav-btn">Login</Link>
            <Link to="/register" className="nav-btn">Sign Up</Link>
          </>
        ) : (
          <div className="account-container" title="My Account">
            <img
              src="https://www.svgrepo.com/show/327465/person-circle.svg"
              alt="My Account"
              className="account-icon"
            />
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
