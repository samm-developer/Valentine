import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CREATOR_NAME, RECIPIENT_NAME } from '../config';
import './Header.css';

const days = [
  { path: '/', label: 'Home', icon: '💕', date: '', short: 'Home' },
  { path: '/memories', label: 'Memories', icon: '🖼️', date: '', short: 'Memories' },
  { path: '/rose-day', label: 'Rose Day', icon: '🌹', date: 'Feb 7', short: 'Rose' },
  { path: '/propose-day', label: 'Propose Day', icon: '💍', date: 'Feb 8', short: 'Propose' },
  { path: '/chocolate-day', label: 'Chocolate Day', icon: '🍫', date: 'Feb 9', short: 'Chocolate' },
  { path: '/teddy-day', label: 'Teddy Day', icon: '🧸', date: 'Feb 10', short: 'Teddy' },
  { path: '/promise-day', label: 'Promise Day', icon: '🤞', date: 'Feb 11', short: 'Promise' },
  { path: '/hug-day', label: 'Hug Day', icon: '🤗', date: 'Feb 12', short: 'Hug' },
  { path: '/kiss-day', label: 'Kiss Day', icon: '💋', date: 'Feb 13', short: 'Kiss' },
  { path: '/valentine-day', label: "Valentine's Day", icon: '❤️', date: 'Feb 14', short: 'Valentine' },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
        <div className="header__inner">
          {/* Logo */}
          <div className="header__logo" onClick={() => navigate('/')}>
            <span className="header__logo-heart">♥</span>
            <span className="header__logo-text">Valentine Week</span>
          </div>

          {/* Desktop Nav */}
          <nav className="header__nav">
            {days.map((day) => (
              <button
                key={day.path}
                className={`header__nav-item ${isActive(day.path) ? 'active' : ''}`}
                onClick={() => navigate(day.path)}
              >
                <span className="header__nav-icon">{day.icon}</span>
                <span className="header__nav-label">{day.short}</span>
                {day.date && <span className="header__nav-date">{day.date}</span>}
                {isActive(day.path) && <span className="header__nav-indicator"></span>}
              </button>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className={`header__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <div className="mobile-menu__overlay" onClick={() => setMenuOpen(false)}></div>
        <div className="mobile-menu__panel">
          <div className="mobile-menu__header">
            <span className="mobile-menu__title">💕 Valentine Week</span>
          </div>
          <div className="mobile-menu__items">
            {days.map((day, index) => (
              <button
                key={day.path}
                className={`mobile-menu__item ${isActive(day.path) ? 'active' : ''}`}
                onClick={() => navigate(day.path)}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <span className="mobile-menu__item-icon">{day.icon}</span>
                <div className="mobile-menu__item-info">
                  <span className="mobile-menu__item-label">{day.label}</span>
                  {day.date && <span className="mobile-menu__item-date">{day.date}</span>}
                </div>
                {isActive(day.path) && <span className="mobile-menu__item-active">♥</span>}
              </button>
            ))}
          </div>
          <div className="mobile-menu__footer">
            <p>Friendship celebration by {CREATOR_NAME} for {RECIPIENT_NAME} ♥</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
