import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const hugTypes = [
  { type: 'The Tight Hug', emoji: '🤗', desc: 'The kind where we squeeze each other tight. Where the world stops and it\'s just us — wrapped in warmth, reminded that we\'re not alone.', when: 'When I miss you more than words can say' },
  { type: 'The Surprise Hug', emoji: '🫢', desc: 'The one I give from behind when you\'re not expecting it. Arms wrapping around you like a friendship ambush. Your startled laugh — my favorite soundtrack.', when: 'When we reunite after time apart' },
  { type: 'The Comfort Hug', emoji: '🫂', desc: 'Soft, slow, and silent. The hug that says "I\'m here" without a single word. A shoulder to lean on when everything feels too heavy.', when: 'When the world is too heavy for you' },
  { type: 'The Spinning Hug', emoji: '🌀', desc: 'The one where we spin with joy — because seeing you after being apart makes everything feel a little lighter.', when: 'When we see each other after being apart' },
  { type: 'The Supportive Hug', emoji: '😌', desc: 'My arms around you. A hug that whispers, "You are safe, you are valued, you matter to me." The kind friends give when words aren\'t enough.', when: 'When you need to feel supported' },
  { type: 'The Never-Let-Go Hug', emoji: '♾️', desc: 'The kind that says "I\'ve got you." Where letting go feels impossible because sometimes a friend\'s embrace is exactly what we need.', when: 'When you need a friend to hold on to' },
];

const quotes = [
  { quote: "A hug from you doesn't just warm my body — it reminds me I'm not alone. It's the kind of warmth that no winter can ever take away.", author: "Warmth Eternal" },
  { quote: "They say home is where the heart is. Sometimes home is a friend's arms when you need one. So wrap them around me, and I feel at peace.", author: "Safe Space" },
  { quote: "I don't need much when I'm hurting. I just need a friend. Your hug is the reminder that everything will be okay.", author: "My Comfort" },
  { quote: "If I could freeze time, I'd freeze it in the middle of our longest hug — where nothing else exists except the comfort of a true friend.", author: "Frozen In Joy" },
];

const HugDay = () => {
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
    <div className="day-page day-page--hug">
      <FloatingHearts />

      <PageTransition>
        <DayHero
          icon="🤗"
          date="February 12th"
          title="Hug Day"
          subtitle="Some feelings are too big for words — so I'll wrap them in a hug"
          gradient1="#66bb6a"
          gradient2="#2e7d32"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              Science says a 20-second hug releases oxytocin and makes you feel connected.
              But when I hug you, it feels like the universe is reminding us — some bonds
              transcend words. A good friend's embrace says everything we need to hear.
            </p>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Every Hug Has A Story</h2>
            <div className="hug-grid">
              {hugTypes.map((hug, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`hug-card ${visibleItems.has(i) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="hug-card__header">
                    <span className="hug-card__emoji">{hug.emoji}</span>
                    <h3 className="hug-card__type">{hug.type}</h3>
                  </div>
                  <p className="hug-card__desc">{hug.desc}</p>
                  <div className="hug-card__when">
                    <span>When?</span> {hug.when}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Embraced In Words</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i + hugTypes.length] = el)}
                  data-index={i + hugTypes.length}
                  className={`quote-wrapper ${visibleItems.has(i + hugTypes.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#66bb6a" />
                </div>
              ))}
            </div>
          </div>

          <div className="day-section day-section--special">
            <div className="special-message special-message--hug">
              <span className="special-message__icon">🤗</span>
              <p className="special-message__text">
                "Right now, close your eyes for a moment.<br />
                Take a deep breath.<br />
                Feel it? That warmth around your heart?<br /><br />
                That's me — sending you a virtual hug from wherever I am.<br />
                Distance means nothing when friendship is this strong."
              </p>
              <span className="special-message__signature">— Always Here For You</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/promise-day" label="Promise Day" direction="left" />
            <NavigationArrow to="/kiss-day" label="Kiss Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default HugDay;
