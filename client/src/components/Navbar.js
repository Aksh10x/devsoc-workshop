import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaHeart, FaUser, FaCompass, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/swipe" className="navbar-brand">
          <FaHeart className="brand-icon" />
          DateApp
        </Link>
        
        {/* Desktop Navigation */}
        <div className="navbar-links desktop-nav">
          <Link 
            to="/swipe" 
            className={`navbar-link ${isActive('/swipe')}`}
          >
            <FaCompass className="nav-icon" />
            Discover
          </Link>
          <Link 
            to="/matches" 
            className={`navbar-link ${isActive('/matches')}`}
          >
            <FaHeart className="nav-icon" />
            Matches
          </Link>
          <Link 
            to="/profile" 
            className={`navbar-link ${isActive('/profile')}`}
          >
            <FaUser className="nav-icon" />
            Profile
          </Link>
          <button 
            onClick={handleLogout}
            className="logout-btn"
          >
            <FaSignOutAlt className="nav-icon" />
            Logout
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-toggle"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'mobile-sidebar-open' : ''}`}>
        <div className="mobile-sidebar-overlay" onClick={closeMobileMenu}></div>
        <div className="mobile-sidebar-content">
          <div className="mobile-sidebar-header">
            <Link to="/swipe" className="mobile-brand" onClick={closeMobileMenu}>
              <FaHeart className="brand-icon" />
              DateApp
            </Link>
            <button 
              className="mobile-close-btn"
              onClick={closeMobileMenu}
              aria-label="Close menu"
            >
              <FaTimes />
            </button>
          </div>
          
          <div className="mobile-nav-links">
            <Link 
              to="/swipe" 
              className={`mobile-nav-link ${isActive('/swipe')}`}
              onClick={closeMobileMenu}
            >
              <FaCompass className="nav-icon" />
              Discover
            </Link>
            <Link 
              to="/matches" 
              className={`mobile-nav-link ${isActive('/matches')}`}
              onClick={closeMobileMenu}
            >
              <FaHeart className="nav-icon" />
              Matches
            </Link>
            <Link 
              to="/profile" 
              className={`mobile-nav-link ${isActive('/profile')}`}
              onClick={closeMobileMenu}
            >
              <FaUser className="nav-icon" />
              Profile
            </Link>
            <button 
              onClick={handleLogout}
              className="mobile-logout-btn"
            >
              <FaSignOutAlt className="nav-icon" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
