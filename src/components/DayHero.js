import React, { useEffect, useState } from 'react';
import './DayHero.css';

const DayHero = ({ icon, date, title, subtitle, gradient1, gradient2 }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => setShow(true), 200);
  }, []);

  return (
    <div
      className={`day-hero ${show ? 'show' : ''}`}
      style={{
        '--grad1': gradient1 || 'var(--rose)',
        '--grad2': gradient2 || 'var(--deep-rose)',
      }}
    >
      <div className="day-hero__bg-orb day-hero__bg-orb--1"></div>
      <div className="day-hero__bg-orb day-hero__bg-orb--2"></div>

      <div className="day-hero__icon">{icon}</div>
      <p className="day-hero__date">{date}</p>
      <h1 className="day-hero__title">{title}</h1>
      <p className="day-hero__subtitle">{subtitle}</p>
      <div className="day-hero__divider">
        <div className="day-hero__divider-line"></div>
        <span>♥</span>
        <div className="day-hero__divider-line"></div>
      </div>
    </div>
  );
};

export default DayHero;
