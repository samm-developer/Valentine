import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const roseColors = [
  { color: 'Red Rose', emoji: '🌹', meaning: 'Deep love & passion', hex: '#e8416f' },
  { color: 'Pink Rose', emoji: '🌸', meaning: 'Grace, gratitude & admiration', hex: '#f8bbd0' },
  { color: 'White Rose', emoji: '💮', meaning: 'Pure love & new beginnings', hex: '#fff8f0' },
  { color: 'Yellow Rose', emoji: '🌼', meaning: 'Friendship & joy', hex: '#ffd700' },
  { color: 'Lavender Rose', emoji: '🪻', meaning: 'Magic in a single glance', hex: '#e8d5f5' },
  { color: 'Orange Rose', emoji: '🏵️', meaning: 'Desire & enthusiasm', hex: '#ff8c42' },
];

const quotes = [
  { quote: "A single rose can be my garden, a single friend can be my world. But you, my love, are both — my garden and my world.", author: "For You" },
  { quote: "I'd rather have roses on my table than diamonds on my neck, but I'd rather have you in my heart than anything else in this universe.", author: "With Love" },
  { quote: "If I had a flower for every time you made me smile, I'd have an endless garden. So here's a rose for every heartbeat you've stolen from me.", author: "Yours Always" },
  { quote: "Some people search their whole life for a rose without thorns. I found something better — a love that blooms even through the thorns.", author: "Forever Yours" },
];

const RoseDay = () => {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);
  const [petalCount] = useState(
    [...Array(20)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: Math.random() * 6 + 8,
      size: Math.random() * 15 + 8,
    }))
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, Number(entry.target.dataset.index)]));
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="day-page day-page--rose">
      <FloatingHearts />

      {/* Falling Rose Petals */}
      <div className="rose-petals-bg">
        {petalCount.map((p) => (
          <div
            key={p.id}
            className="rose-petal"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <PageTransition>
        <DayHero
          icon="🌹"
          date="February 7th"
          title="Rose Day"
          subtitle="Where love is gifted in shades of roses — a petal at a time"
          gradient1="#e8416f"
          gradient2="#c2185b"
        />

        <div className="day-content">
          {/* Opening */}
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              Every story has a beginning. Ours started the moment I first saw your picture —
              and just like a rose unfurling in the morning sun, My heart opened to a unique rose.
            </p>
          </div>

          {/* Rose meanings */}
          <div className="day-section">
            <h2 className="day-section__title">A Rose For Every Feeling</h2>
            <div className="rose-colors-grid">
              {roseColors.map((rose, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i] = el)}
                  data-index={i}
                  className={`rose-color-card ${visibleCards.has(i) ? 'visible' : ''}`}
                  style={{
                    '--card-color': rose.hex,
                    transitionDelay: `${i * 0.1}s`,
                  }}
                >
                  <span className="rose-color-card__emoji">{rose.emoji}</span>
                  <h3 className="rose-color-card__name">{rose.color}</h3>
                  <p className="rose-color-card__meaning">{rose.meaning}</p>
                </div>
              ))}
            </div>
            <p className="day-section__note">
              But for you, I'd give every color — because you deserve all the roses in the universe.
            </p>
          </div>

          {/* Quotes */}
          <div className="day-section">
            <h2 className="day-section__title">Words From My Heart</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (cardRefs.current[i + roseColors.length] = el)}
                  data-index={i + roseColors.length}
                  className={`quote-wrapper ${visibleCards.has(i + roseColors.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#e8416f" />
                </div>
              ))}
            </div>
          </div>

          {/* Special message */}
          <div className="day-section day-section--special">
            <div className="special-message">
              <span className="special-message__icon">🌹</span>
              <p className="special-message__text">
                "If I were to give you a rose for every time I thought of you,
                you'd be walking through an infinite garden for the rest of your life."
              </p>
              <span className="special-message__signature">— Your Forever Admirer</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/" label="Home" direction="left" />
            <NavigationArrow to="/propose-day" label="Propose Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default RoseDay;
