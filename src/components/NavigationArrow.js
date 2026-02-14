import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NavigationArrow.css';

const NavigationArrow = ({ to, label, direction = 'right' }) => {
  const navigate = useNavigate();

  return (
    <button
      className={`nav-arrow nav-arrow--${direction}`}
      onClick={() => navigate(to)}
      aria-label={label}
    >
      <span className="nav-arrow__text">{label}</span>
      <span className="nav-arrow__icon">
        {direction === 'right' ? '→' : '←'}
      </span>
      <span className="nav-arrow__heart">♥</span>
    </button>
  );
};

export default NavigationArrow;
