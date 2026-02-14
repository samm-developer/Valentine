import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const hugTypes = [
  { type: 'The Tight Hug', emoji: '🤗', desc: 'The kind where I pull you so close that our heartbeats sync. Where the world stops and it\'s just us — wrapped in warmth, drowning in love.', when: 'When I miss you more than words can say' },
  { type: 'The Surprise Hug', emoji: '🫢', desc: 'The one I give from behind when you\'re not expecting it. Arms wrapping around you like a love ambush. Your startled laugh — my favorite soundtrack.', when: 'When I can\'t resist your cuteness' },
  { type: 'The Comfort Hug', emoji: '🫂', desc: 'Soft, slow, and silent. The hug that says "I\'m here" without a single word. My hands rubbing your back, my heartbeat telling you everything will be okay.', when: 'When the world is too heavy for you' },
  { type: 'The Spinning Hug', emoji: '🌀', desc: 'The one where I lift you up and spin — because my joy at seeing you is so overwhelming that gravity alone can\'t contain it.', when: 'When I see you after being apart' },
  { type: 'The Forehead Hug', emoji: '😌', desc: 'My arms around you, my lips on your forehead. A hug that whispers, "You are safe, you are cherished, you are the most important person in my universe."', when: 'When I want you to feel deeply loved' },
  { type: 'The Never-Let-Go Hug', emoji: '♾️', desc: 'The kind that has no end. Where every second we hold on, we fall deeper. Where letting go isn\'t an option, because my arms were made to hold you.', when: 'Every moment of forever' },
];

const quotes = [
  { quote: "A hug from you doesn't just warm my body — it sets fire to my soul. It's the kind of warmth that no winter can ever take away.", author: "Warmth Eternal" },
  { quote: "They say home is where the heart is. My heart is wherever your arms are. So wrap them around me, and I'm already home.", author: "Home In You" },
  { quote: "I don't need medicine when I'm hurting. I just need your arms. Your hug is the cure to everything that ails my restless heart.", author: "My Healing" },
  { quote: "If I could freeze time, I'd freeze it in the middle of our longest hug — where nothing else exists except the rhythm of two hearts beating as one.", author: "Frozen In Love" },
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
              Science says a 20-second hug releases oxytocin and makes you feel loved.
              But when I hug you, the universe itself seems to exhale — as if the cosmos
              has been waiting for this moment where two hearts finally become one.
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
                That's me — hugging your soul from wherever I am.<br />
                Distance means nothing when love is this strong."
              </p>
              <span className="special-message__signature">— Rajat</span>
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
