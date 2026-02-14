import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import NavigationArrow from '../components/NavigationArrow';
import './ReasonsPage.css';

const reasons = [
  {
    icon: '✨',
    title: 'Your Magical Smile',
    text: 'The way your smile lights up the room makes even the sun feel jealous. One smile from you, and my day gets brighter.',
  },
  {
    icon: '🌙',
    title: 'Your Beautiful Soul',
    text: 'Your kindness isn\'t just a trait — it\'s a superpower. You make everyone around you feel seen, heard, and valued.',
  },
  {
    icon: '🦋',
    title: 'The Way You Laugh',
    text: 'Your laughter is my favorite sound. It echoes in my mind long after the moment has passed, and I live for those moments.',
  },
  {
    icon: '🌹',
    title: 'Your Strength',
    text: 'You face every storm with grace and come out blooming like a rose. Your strength inspires me to be a better person every single day.',
  },
  {
    icon: '💫',
    title: 'How Safe I Feel',
    text: 'Around you, I can be myself without filters. You are my calm, my safe space, my person in this beautiful mess of life.',
  },
  {
    icon: '🌸',
    title: 'Your Energy Is Contagious',
    text: 'Your presence brings a unique warmth. You have a way of making ordinary moments feel special and memorable.',
  },
  {
    icon: '💖',
    title: 'You Believe In Me',
    text: 'If the whole world doubts me, you stand there with unwavering faith. You see the best version of me even when I can\'t see it myself.',
  },
  {
    icon: '🌊',
    title: 'Every Little Thing',
    text: 'The way you tell stories, your silly jokes, your perspective on life — I appreciate all of it. Every. Single. Thing.',
  },
  {
    icon: '🔥',
    title: 'You Make Life Better',
    text: 'Four walls don\'t make a home — but a good friend makes anywhere feel like one. You add so much to my life.',
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
            <h1 className="reasons-title">Reasons You're An Amazing Friend</h1>
            <p className="reasons-subtitle">
              "I could write a thousand books and still not capture<br />
              all the reasons I'm grateful for you."
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
            <p>"And if someone asked me to describe a true friend in one word,<br /> I'd simply say your name."</p>
          </div>

          <div className="reasons-nav">
            <NavigationArrow to="/letter" label="Letter" direction="left" />
            <NavigationArrow to="/promises" label="My Promises" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default ReasonsPage;
