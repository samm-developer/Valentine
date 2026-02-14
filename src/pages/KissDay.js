import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const kissTypes = [
  { type: 'The Forehead Kiss', emoji: '😇', desc: 'A kiss that says "I respect you, I protect you, I cherish you." It\'s the most innocent kiss with the deepest meaning — pure, tender, and eternal.' },
  { type: 'The Surprise Kiss', emoji: '😘', desc: 'That unexpected moment when I steal a kiss on your cheek while you\'re mid-sentence. Your blush? Worth more than a thousand sunsets.' },
  { type: 'The Goodbye Kiss', emoji: '🥺', desc: 'The hardest kiss — because it means I have to let go for a while. But every goodbye kiss carries a promise: "I\'ll be back. Always."' },
  { type: 'The Good Morning Kiss', emoji: '🌅', desc: 'Soft lips, sleepy eyes, messy hair. The first kiss of the day — when the world is still quiet, and all I can hear is your heartbeat next to mine.' },
  { type: 'The "I Love You" Kiss', emoji: '💖', desc: 'The kiss that happens mid-sentence because the words "I love you" aren\'t enough. When actions speak louder, my lips do the talking.' },
  { type: 'The Forever Kiss', emoji: '♾️', desc: 'Not measured in seconds. Measured in lifetimes. The kiss that says: "In every universe, in every life, I would find you and kiss you again."' },
];

const quotes = [
  { quote: "A kiss is the shortest distance between two hearts. And when I kiss you, the distance doesn't just disappear — the whole universe collapses into just us.", author: "Infinite Closeness" },
  { quote: "I have kissed the edges of your name in my prayers. I have kissed the thought of you in my dreams. But nothing compares to the real thing.", author: "Dream To Reality" },
  { quote: "If I could bottle the feeling of your kiss, it would be the most expensive perfume in the world — intoxicating, addictive, and utterly unforgettable.", author: "Bottled Love" },
  { quote: "Every love story has a first kiss. Ours wasn't just a kiss — it was a declaration, a promise, a beginning of something that will never end.", author: "Our Beginning" },
];

const KissDay = () => {
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
    <div className="day-page day-page--kiss">
      <FloatingHearts />

      <PageTransition>
        <DayHero
          icon="💋"
          date="February 13th"
          title="Kiss Day"
          subtitle="Where words end and love begins — on the edge of two lips"
          gradient1="#ef5350"
          gradient2="#b71c1c"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              A kiss is the language of love that needs no translation.
              It speaks fluently in every language, crosses every boundary,
              and carries more emotion than a thousand love letters combined.
              Here is my vocabulary of love — written on your lips.
            </p>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">The Language of Lips</h2>
            <div className="kiss-grid">
              {kissTypes.map((kiss, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`kiss-card ${visibleItems.has(i) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.12}s` }}
                >
                  <div className="kiss-card__emoji">{kiss.emoji}</div>
                  <h3 className="kiss-card__type">{kiss.type}</h3>
                  <p className="kiss-card__desc">{kiss.desc}</p>
                  <div className="kiss-card__lips">💋</div>
                </div>
              ))}
            </div>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">Whispered Between Kisses</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i + kissTypes.length] = el)}
                  data-index={i + kissTypes.length}
                  className={`quote-wrapper ${visibleItems.has(i + kissTypes.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#ef5350" />
                </div>
              ))}
            </div>
          </div>

          <div className="day-section day-section--special">
            <div className="special-message special-message--kiss">
              <span className="special-message__icon">💋</span>
              <p className="special-message__text">
                "If words are the dress of thoughts,<br />
                then a kiss is the undressing of the soul.<br /><br />
                And when I kiss you,<br />
                every wall I've built comes crashing down —<br />
                leaving nothing but raw, beautiful, untamed love."
              </p>
              <span className="special-message__signature">— Rajat</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/hug-day" label="Hug Day" direction="left" />
            <NavigationArrow to="/valentine-day" label="Valentine's Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default KissDay;
