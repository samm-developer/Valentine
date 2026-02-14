import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const teddyTraits = [
  { trait: 'Always There', icon: '🧸', desc: 'Like a teddy bear that sits by your side through every storm, I promise to always be there — silently, steadily, and without fail.' },
  { trait: 'Warm Hugs', icon: '🤗', desc: 'A teddy gives the kind of hug that makes the world disappear. That\'s exactly what I want my love to feel like for you.' },
  { trait: 'Soft & Gentle', icon: '💗', desc: 'In a world that can be rough, I want to be your softness — your gentle place to fall, your comfort at the end of a hard day.' },
  { trait: 'Never Judges', icon: '🌙', desc: 'A teddy loves you at your best and at your worst. And so do I — completely, unconditionally, without a single hesitation.' },
  { trait: 'Keeps Secrets', icon: '🤫', desc: 'Tell me your wildest dreams, your deepest fears, your silliest thoughts. I\'ll hold them all close — just like a teddy holds your midnight whispers.' },
  { trait: 'Forever Loyal', icon: '💎', desc: 'Teddies don\'t leave. They don\'t give up. They stay. And that\'s exactly the kind of love I\'m giving you — the staying kind.' },
];

const quotes = [
  { quote: "You don't need a teddy bear when you have someone who holds you tighter, loves you harder, and stays longer than any stuffed toy ever could. That someone is me.", author: "Your Human Teddy" },
  { quote: "I may not be soft and fluffy, but I promise my love is — gentle enough to heal your wounds and strong enough to protect your heart.", author: "Gentle Love" },
  { quote: "A teddy bear is a friend you hug and never want to let go. You, my love, are the person I hug and never want to release from my arms.", author: "Holding On" },
  { quote: "In the museum of my heart, you sit on the highest shelf — not because you're out of reach, but because you're the most precious thing I own.", author: "Treasured" },
];

const TeddyDay = () => {
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
    <div className="day-page day-page--teddy">
      <FloatingHearts />

      <PageTransition>
        <DayHero
          icon="🧸"
          date="February 10th"
          title="Teddy Day"
          subtitle="A warm, soft love that never lets go"
          gradient1="#ff8a65"
          gradient2="#e64a19"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              A teddy bear is the first thing we hold when the world feels too big.
              You, my love, are the person I want to hold when the world feels too much.
              You are my comfort, my calm, my forever home.
            </p>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Why You're My Teddy Bear</h2>
            <div className="teddy-grid">
              {teddyTraits.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`teddy-card ${visibleItems.has(i) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <span className="teddy-card__icon">{item.icon}</span>
                  <h3 className="teddy-card__trait">{item.trait}</h3>
                  <p className="teddy-card__desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Cuddled In Words</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i + teddyTraits.length] = el)}
                  data-index={i + teddyTraits.length}
                  className={`quote-wrapper ${visibleItems.has(i + teddyTraits.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#ff8a65" />
                </div>
              ))}
            </div>
          </div>

          <div className="day-section day-section--special">
            <div className="special-message special-message--teddy">
              <span className="special-message__icon">🧸</span>
              <p className="special-message__text">
                "I wish I could shrink myself into a teddy bear<br />
                so you could hold me close every single night,<br />
                and I could whisper 'I love you'<br />
                every time you squeeze me tight."
              </p>
              <span className="special-message__signature">— Your Cuddle Partner Forever</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/chocolate-day" label="Chocolate Day" direction="left" />
            <NavigationArrow to="/promise-day" label="Promise Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default TeddyDay;
