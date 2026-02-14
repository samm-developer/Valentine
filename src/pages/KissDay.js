import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const kissTypes = [
  { type: 'The Cheek Kiss', emoji: '😇', desc: 'The classic friend kiss — a quick peck on the cheek that says "I\'m so glad to see you!" Pure, warm, and the way friends show affection in so many places.' },
  { type: 'The Surprise Hug-Kiss', emoji: '😘', desc: 'That unexpected moment when we greet each other with a hug and a cheek kiss. Your smile? Worth more than a thousand sunsets.' },
  { type: 'The Goodbye Kiss', emoji: '🥺', desc: 'The bittersweet one — because it means we have to part for a while. But every goodbye carries a promise: "I\'ll be back. Always. Text me!"' },
  { type: 'The Celebratory Kiss', emoji: '🌅', desc: 'The one we share when something amazing happens — a success, a laugh, a moment worth celebrating. Friends lift each other up, and sometimes that includes a joyful cheek kiss!' },
  { type: 'The "You\'re Amazing" Kiss', emoji: '💖', desc: 'The gesture that happens when words aren\'t enough. A quick kiss on the cheek that says: "I\'m so proud of you" or "Thank you for being you."' },
  { type: 'The Friendship Kiss', emoji: '♾️', desc: 'Not measured in seconds. Measured in years of friendship. The kind of warm greeting that says: "You\'re one of my people. I\'m so glad we\'re friends."' },
];

const quotes = [
  { quote: "A friendly kiss on the cheek is the shortest way to say 'I care about you' without a single word. And when we greet each other that way, the distance between us disappears.", author: "Warm Greetings" },
  { quote: "I've missed our catch-ups, our laughs, our silly moments. And when we meet again, you can bet there'll be a hug and a cheek kiss waiting for you.", author: "Reunion Joy" },
  { quote: "If I could bottle the feeling of reconnecting with a good friend, it would be the best feeling in the world — comforting, joyful, and utterly unforgettable.", author: "Friendship in a Bottle" },
  { quote: "Every great friendship has those little moments — a cheek kiss hello, a hug goodbye. Ours is full of them, and I wouldn't have it any other way.", author: "Our Bond" },
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
          subtitle="Where friendship shows itself — in warm greetings and cheek kisses"
          gradient1="#ef5350"
          gradient2="#b71c1c"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              A friendly kiss on the cheek is a universal language of warmth.
              It speaks of care, of joy, of "I'm so glad to see you" —
              the kind of gesture that needs no translation.
              Here's to the small ways friends show they care.
            </p>
          </div>

          <div className="day-section">
            <h2 className="day-section__title">The Language of Friendship</h2>
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
            <h2 className="day-section__title">From the Heart</h2>
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
                then a warm greeting is the smile of friendship.<br /><br />
                And when we meet,<br />
                every worry fades for a moment —<br />
                leaving nothing but joy, laughter, and the comfort of a true friend."
              </p>
              <span className="special-message__signature">— Your Friend Always</span>
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
