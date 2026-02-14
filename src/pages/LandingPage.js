import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [heartBeat, setHeartBeat] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    setTimeout(() => setShowButton(true), 2500);
    setTimeout(() => setHeartBeat(true), 3000);
  }, []);

  return (
    <div className="landing-page">
      <FloatingHearts />
      <div className="landing-stars">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 1}s`,
            }}
          />
        ))}
      </div>

      <PageTransition>
        <div className="landing-content">
          <div className={`landing-heart-icon ${heartBeat ? 'beating' : ''}`}>
            ♥
          </div>

          <p className={`landing-date ${showContent ? 'show' : ''}`}>
            14th February 2026
          </p>

          <h1 className={`landing-title ${showContent ? 'show' : ''}`}>
            <span className="landing-title__line1">To The Most</span>
            <span className="landing-title__line2">Beautiful Soul</span>
            <span className="landing-title__line3">In My Universe</span>
          </h1>

          <div className={`landing-divider ${showContent ? 'show' : ''}`}>
            <span>✦</span>
            <div className="divider-line"></div>
            <span>♥</span>
            <div className="divider-line"></div>
            <span>✦</span>
          </div>

          <p className={`landing-quote ${showContent ? 'show' : ''}`}>
            "In all the world, there is no heart for me like yours.<br />
            In all the world, there is no love for you like mine."
          </p>

          <p className={`landing-attribution ${showContent ? 'show' : ''}`}>
            — Maya Angelou
          </p>

          <button
            className={`landing-enter ${showButton ? 'show' : ''}`}
            onClick={() => navigate('/letter')}
          >
            <span className="landing-enter__text">Open Your Heart</span>
            <span className="landing-enter__arrow">♥</span>
            <div className="landing-enter__glow"></div>
          </button>
        </div>
      </PageTransition>

      <div className="landing-petals">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="petal"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 5 + 8}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
