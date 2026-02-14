import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const chocolateTypes = [
  { name: 'Dark Chocolate', emoji: '🍫', meaning: 'Deep appreciation — like the way our late-night chats mean everything to me', color: '#3e2723' },
  { name: 'Milk Chocolate', emoji: '🥛', meaning: 'Sweet, comforting friendship — the way you make ordinary days feel special', color: '#795548' },
  { name: 'White Chocolate', emoji: '⬜', meaning: 'Pure kindness — the warmth I feel when we catch up after time apart', color: '#d7ccc8' },
  { name: 'Truffle', emoji: '🍬', meaning: 'Something special — because you deserve nothing less than the best', color: '#4e342e' },
  { name: 'Hazelnut', emoji: '🌰', meaning: 'A wonderful surprise — like finding an amazing friend when you least expect it', color: '#6d4c41' },
  { name: 'Caramel Filled', emoji: '✨', meaning: 'Warm, golden friendship — the kind that makes everything feel a little better', color: '#bf8040' },
];

const quotes = [
  { quote: "Life is like a box of chocolates — but you, my friend, are the sweetest piece I've ever found. And I plan on savoring every moment of our friendship.", author: "Sweet Nothings" },
  { quote: "You're like chocolate — the kind of person I can never get enough of. Our hangouts and conversations? Always leave me wanting more.", author: "Craving More" },
  { quote: "Some people bring chocolate to sweeten the day. You bring yourself — and that's sweeter than any treat the world has to offer.", author: "My Sweetest Friend" },
  { quote: "If our friendship were a chocolate, it would be the kind that melts slowly — savored, cherished, and remembered long after the moment passes.", author: "Warm Memories" },
];

const ChocolateDay = () => {
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
      { threshold: 0.15 }
    );
    itemRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="day-page day-page--chocolate">
      <FloatingHearts />

      <PageTransition>
        <DayHero
          icon="🍫"
          date="February 9th"
          title="Chocolate Day"
          subtitle="Because friendship should always taste this sweet"
          gradient1="#795548"
          gradient2="#4e342e"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              They say chocolate releases the same chemicals that make us feel good.
              No wonder every bite reminds me of you — sweet, comforting,
              and the kind of presence that brightens any day.
            </p>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Every Flavor of Friendship</h2>
            <div className="chocolate-grid">
              {chocolateTypes.map((choc, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`chocolate-card ${visibleItems.has(i) ? 'visible' : ''}`}
                  style={{ '--choc-color': choc.color, transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="chocolate-card__emoji">{choc.emoji}</div>
                  <h3 className="chocolate-card__name">{choc.name}</h3>
                  <p className="chocolate-card__meaning">{choc.meaning}</p>
                  <div className="chocolate-card__drip"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Sweetest Words For You</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i + chocolateTypes.length] = el)}
                  data-index={i + chocolateTypes.length}
                  className={`quote-wrapper ${visibleItems.has(i + chocolateTypes.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#8d6e63" />
                </div>
              ))}
            </div>
          </div>

          <div className="day-section day-section--special">
            <div className="special-message special-message--chocolate">
              <span className="special-message__icon">🍫</span>
              <p className="special-message__text">
                "If I could wrap my gratitude in chocolate paper,<br />
                it would be the most beautiful gift<br />
                the world has ever unwrapped.<br /><br />
                But since I can't — here's this message instead. You're the sweetest friend."
              </p>
              <span className="special-message__signature">— Your Grateful Friend</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/propose-day" label="Propose Day" direction="left" />
            <NavigationArrow to="/teddy-day" label="Teddy Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default ChocolateDay;
