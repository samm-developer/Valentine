import React, { useEffect, useState } from 'react';
import './FloatingHearts.css';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random();
      const heart = {
        id,
        left: Math.random() * 100,
        size: Math.random() * 20 + 10,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
        opacity: Math.random() * 0.4 + 0.1,
        symbol: ['❤', '💕', '♥', '💗', '🌹', '✨'][Math.floor(Math.random() * 6)]
      };
      setHearts(prev => [...prev.slice(-25), heart]);
    };

    const interval = setInterval(createHeart, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map(heart => (
        <span
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            opacity: heart.opacity,
          }}
        >
          {heart.symbol}
        </span>
      ))}
    </div>
  );
};

export default FloatingHearts;
