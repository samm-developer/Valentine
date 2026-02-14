import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import NavigationArrow from '../components/NavigationArrow';
import './ReasonsPage.css';

const reasons = [
  {
    icon: '✨',
    title: 'Your Magical Smile',
    text: 'The way your smile lights up the room makes even the sun feel jealous. One smile from you, and my entire universe realigns.',
  },
  {
    icon: '🌙',
    title: 'Your Beautiful Soul',
    text: 'Your kindness isn\'t just a trait — it\'s a superpower. You make everyone around you feel seen, heard, and loved.',
  },
  {
    icon: '🦋',
    title: 'The Way You Laugh',
    text: 'Your laughter is my favorite melody. It echoes in my heart long after the moment has passed, and I live to hear it again.',
  },
  {
    icon: '🌹',
    title: 'Your Strength',
    text: 'You face every storm with grace and come out blooming like a rose. Your strength inspires me to be a better person every single day.',
  },
  {
    icon: '💫',
    title: 'How Safe I Feel',
    text: 'In your arms, the chaos of the world fades away. You are my calm, my peace, my safe haven in this beautiful mess of life.',
  },
  {
    icon: '🌸',
    title: 'Your Eyes Tell Stories',
    text: 'I could get lost in your eyes for eternity. They hold galaxies I want to explore, stories I want to read, and love I want to drown in.',
  },
  {
    icon: '💖',
    title: 'You Believe In Me',
    text: 'When the whole world doubts me, you stand there with unwavering faith. You see the best version of me even when I can\'t see it myself.',
  },
  {
    icon: '🌊',
    title: 'Every Little Thing',
    text: 'The way you scrunch your nose, how you talk in your sleep, your silly jokes — I fell in love with all of it. Every. Single. Thing.',
  },
  {
    icon: '🔥',
    title: 'You Are My Home',
    text: 'Four walls don\'t make a home — you do. Wherever you are is where I belong. You are my address in this vast universe.',
  },
];

const ReasonsPage = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    cardRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="reasons-page">
      <FloatingHearts />

      <PageTransition>
        <div className="reasons-container">
          <div className="reasons-header">
            <span className="reasons-header__icon">♥</span>
            <h1 className="reasons-title">Reasons I Love You</h1>
            <p className="reasons-subtitle">
              "I could write a thousand books and still not capture<br />
              all the reasons my heart chose you."
            </p>
            <div className="reasons-divider">
              <span>∞</span>
            </div>
          </div>

          <div className="reasons-grid">
            {reasons.map((reason, index) => (
              <div
                key={index}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`reason-card ${visibleCards.has(index) ? 'visible' : ''}`}
                style={{ transitionDelay: `${(index % 3) * 0.15}s` }}
              >
                <div className="reason-card__glow"></div>
                <div className="reason-card__number">{String(index + 1).padStart(2, '0')}</div>
                <div className="reason-card__icon">{reason.icon}</div>
                <h3 className="reason-card__title">{reason.title}</h3>
                <p className="reason-card__text">{reason.text}</p>
                <div className="reason-card__border"></div>
              </div>
            ))}
          </div>

          <div className="reasons-footer-quote">
            <p>"And if someone asked me to describe love in one word,<br /> I'd simply say your name."</p>
          </div>

          <div className="reasons-nav">
            <NavigationArrow to="/letter" label="Love Letter" direction="left" />
            <NavigationArrow to="/promises" label="My Promises" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default ReasonsPage;
