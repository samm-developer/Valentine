import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import NavigationArrow from '../components/NavigationArrow';
import './PromisesPage.css';

const promises = [
  {
    promise: "I promise to love you not just when the skies are blue, but especially when the storms arrive — because that's when love truly matters.",
    icon: '🌧️',
  },
  {
    promise: "I promise to be your biggest cheerleader, your loudest fan, and your softest place to land when the world gets too heavy.",
    icon: '🎋',
  },
  {
    promise: "I promise to choose you every single morning, even on the days when love feels like a quiet whisper instead of a roaring fire.",
    icon: '🌅',
  },
  {
    promise: "I promise to never stop trying to make you laugh — because your happiness is the most important mission of my life.",
    icon: '😊',
  },
  {
    promise: "I promise to hold your hand through every chapter of life — the beautiful ones, the messy ones, and everything in between.",
    icon: '🤝',
  },
  {
    promise: "I promise to grow old with you and still look at you the way I looked at you the very first time — with wonder, with awe, with love.",
    icon: '🌿',
  },
  {
    promise: "I promise that no distance, no argument, and no bad day will ever make me love you any less. If anything, they'll make me love you more.",
    icon: '💪',
  },
  {
    promise: "I promise to always remind you how special you are — especially on the days you forget. Because the world is better with you in it.",
    icon: '⭐',
  },
];

const PromisesPage = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const promiseRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            setTimeout(() => setActiveIndex((prev) => Math.max(prev, index)), index * 100);
          }
        });
      },
      { threshold: 0.3 }
    );

    promiseRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="promises-page">
      <FloatingHearts />

      <PageTransition>
        <div className="promises-container">
          <div className="promises-header">
            <div className="promises-ring">
              <div className="promises-ring__inner">♥</div>
            </div>
            <h1 className="promises-title">My Promises To You</h1>
            <p className="promises-subtitle">
              "Love is not just a feeling — it's a promise<br />
              I make to you with every breath I take."
            </p>
          </div>

          <div className="promises-timeline">
            <div className="promises-timeline__line"></div>

            {promises.map((item, index) => (
              <div
                key={index}
                ref={(el) => (promiseRefs.current[index] = el)}
                data-index={index}
                className={`promise-item ${index <= activeIndex ? 'visible' : ''} ${
                  index % 2 === 0 ? 'promise-item--left' : 'promise-item--right'
                }`}
              >
                <div className="promise-item__dot">
                  <span>{item.icon}</span>
                </div>
                <div className="promise-item__content">
                  <div className="promise-item__number">Promise {index + 1}</div>
                  <p className="promise-item__text">{item.promise}</p>
                  <div className="promise-item__heart">♥</div>
                </div>
              </div>
            ))}
          </div>

          <div className="promises-oath">
            <div className="promises-oath__card">
              <p className="promises-oath__text">
                "These are not just words written on a screen —<br />
                they are the vows of my heart, sealed with every beat,<br />
                signed by my soul, and delivered by love itself."
              </p>
              <div className="promises-oath__signature">
                ~ With All My Love, Rajat ~
              </div>
            </div>
          </div>

          <div className="promises-nav">
            <NavigationArrow to="/reasons" label="Reasons" direction="left" />
            <NavigationArrow to="/forever" label="Grand Finale" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default PromisesPage;
