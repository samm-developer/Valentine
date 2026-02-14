import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const promises = [
  { promise: "I promise to love you not just when the skies are blue, but especially when the storms arrive — because that's when love truly matters.", icon: '🌧️' },
  { promise: "I promise to be your biggest cheerleader, your loudest fan, and your softest place to land when the world gets too heavy.", icon: '🎋' },
  { promise: "I promise to choose you every single morning, even on the days when love feels like a quiet whisper instead of a roaring fire.", icon: '🌅' },
  { promise: "I promise to never stop trying to make you laugh — because your happiness is the most important mission of my life.", icon: '😊' },
  { promise: "I promise to hold your hand through every chapter — the beautiful ones, the messy ones, and everything in between.", icon: '🤝' },
  { promise: "I promise to grow old with you and still look at you the way I looked at you the very first time — with wonder, with awe, with love.", icon: '🌿' },
  { promise: "I promise that no distance, no argument, and no bad day will ever make me love you any less. If anything, they'll make me love you more.", icon: '💪' },
  { promise: "I promise to always remind you how special you are — especially on the days you forget. Because the world is better with you in it.", icon: '⭐' },
];

const quotes = [
  { quote: "A promise from my heart is not just words — it's a contract between my soul and yours. Unbreakable. Eternal. Written in the ink of pure love.", author: "Sealed With Love" },
  { quote: "I don't promise you a life without storms. I promise you that in every storm, my hand will be the one you hold, and my heart will be your shelter.", author: "Your Safe Harbor" },
  { quote: "The most beautiful promise isn't 'I'll never hurt you.' It's 'When the world hurts you, I'll be right here — healing every wound with my love.'", author: "Healing Love" },
  { quote: "I promise to be the reason you believe in forever. Because you, my love, are the reason I already do.", author: "Forever Believer" },
];

const PromiseDay = () => {
  const [visibleItems, setVisibleItems] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleItems((prev) => new Set([...prev, Number(entry.target.dataset.index)]));
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="day-page day-page--promise">
      <FloatingHearts />

      <PageTransition>
        <DayHero
          icon="🤞"
          date="February 11th"
          title="Promise Day"
          subtitle="These aren't just words — they're the vows of my heart"
          gradient1="#26c6da"
          gradient2="#0097a7"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              Love is easy to say but hard to prove. So today, I don't just say
              "I love you" — I make promises. Real ones. The kind that don't fade
              when the honeymoon phase ends. The kind that last beyond forever.
            </p>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">My Promises To You</h2>
            <div className="promise-timeline">
              <div className="promise-timeline__line"></div>
              {promises.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`promise-card ${visibleItems.has(i) ? 'visible' : ''} ${
                    i % 2 === 0 ? 'promise-card--left' : 'promise-card--right'
                  }`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="promise-card__dot">
                    <span>{item.icon}</span>
                  </div>
                  <div className="promise-card__content">
                    <span className="promise-card__label">Promise {i + 1}</span>
                    <p className="promise-card__text">{item.promise}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Sworn By My Heart</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i + promises.length] = el)}
                  data-index={i + promises.length}
                  className={`quote-wrapper ${visibleItems.has(i + promises.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#26c6da" />
                </div>
              ))}
            </div>
          </div>

          <div className="day-section day-section--special">
            <div className="special-message special-message--promise">
              <span className="special-message__icon">🤞</span>
              <p className="special-message__text">
                "These are not just words written on a screen —<br />
                they are the vows of my heart, sealed with every beat,<br />
                signed by my soul, and delivered by love itself.<br /><br />
                I promise you — forever is just the beginning."
              </p>
              <span className="special-message__signature">— Rajat</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/teddy-day" label="Teddy Day" direction="left" />
            <NavigationArrow to="/hug-day" label="Hug Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default PromiseDay;
