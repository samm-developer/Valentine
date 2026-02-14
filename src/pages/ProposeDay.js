import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const proposalSteps = [
  { step: '01', title: 'The First Meeting', text: 'The moment our eyes met, something clicked. It was as if the universe knew we were meant to cross paths and become friends.', icon: '👀' },
  { step: '02', title: 'The First Conversation', text: 'Your words made me feel heard and understood. I knew right then — this was someone I wanted in my corner for life.', icon: '💬' },
  { step: '03', title: 'The First Laugh', text: 'When we first laughed together, it felt natural. The kind of comfort that only comes when you find your people.', icon: '😊' },
  { step: '04', title: 'The Realization', text: 'It wasn\'t sudden. It was a gentle certainty — the quiet knowing that you were the kind of friend worth keeping forever.', icon: '💡' },
  { step: '05', title: 'The Gratitude', text: 'Every great friendship is a gift. And I\'m so grateful the universe brought you into my life — you make everything brighter.', icon: '🦁' },
  { step: '06', title: 'The Promise', text: 'So here I am, with a heart full of gratitude. I promise to be the friend you deserve — today, tomorrow, and for all our adventures ahead.', icon: '💝' },
];

const quotes = [
  { quote: "I wasn't looking for a best friend when I found you. But somehow, you became exactly that — and I'm so glad you did.", author: "My Gratitude" },
  { quote: "They say 'thank you' are two words. But when I say them to you, they carry the weight of a thousand memories and a million smiles.", author: "For You" },
  { quote: "I don't just want to be a chapter in your life. I want to be there for every adventure, every laugh, and every moment that matters.", author: "Your Friend" },
  { quote: "Before you, I didn't know how much a true friend could change things. But then you walked into my life — and everything got better.", author: "Grateful" },
];

const ProposeDay = () => {
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
    <div className="day-page day-page--propose">
      <FloatingHearts />

      <PageTransition>
        <DayHero
          icon="💍"
          date="February 8th"
          title="Propose Day"
          subtitle="The day I celebrate our friendship — and I'd choose you as a friend in a hundred lifetimes"
          gradient1="#9c27b0"
          gradient2="#e040fb"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              Friendship doesn't announce itself with fanfare. It grows softly,
              like a seed in good soil, and before you know it — it has become
              one of the best parts of your life. This is my story of finding you.
            </p>
          </div>

          {/* Journey Steps */}
          <div className="day-section">
            <h2 className="day-section__title">Our Friendship Story</h2>
            <div className="propose-journey">
              <div className="propose-journey__line"></div>
              {proposalSteps.map((item, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                  data-index={i}
                  className={`propose-step ${visibleItems.has(i) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                >
                  <div className="propose-step__marker">
                    <span className="propose-step__icon">{item.icon}</span>
                  </div>
                  <div className="propose-step__card">
                    <span className="propose-step__number">{item.step}</span>
                    <h3 className="propose-step__title">{item.title}</h3>
                    <p className="propose-step__text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quotes */}
          <div className="day-section">
            <h2 className="day-section__title">From My Heart</h2>
            <div className="quotes-grid">
              {quotes.map((q, i) => (
                <div
                  key={i}
                  ref={(el) => (itemRefs.current[i + proposalSteps.length] = el)}
                  data-index={i + proposalSteps.length}
                  className={`quote-wrapper ${visibleItems.has(i + proposalSteps.length) ? 'visible' : ''}`}
                  style={{ transitionDelay: `${i * 0.15}s` }}
                >
                  <QuoteCard quote={q.quote} author={q.author} accent="#e040fb" />
                </div>
              ))}
            </div>
          </div>

          <div className="day-section day-section--special">
            <div className="special-message special-message--propose">
              <span className="special-message__icon">💍</span>
              <p className="special-message__text">
                "I'm not proposing with a ring today.<br />
                I'm celebrating with my entire heart — grateful for every laugh,<br />
                every conversation, and every moment we've shared.<br /><br />
                Here's to us — not just today, but for all our friendship years ahead."
              </p>
              <span className="special-message__signature">— Your Grateful Friend</span>
            </div>
          </div>

          <div className="day-nav">
            <NavigationArrow to="/rose-day" label="Rose Day" direction="left" />
            <NavigationArrow to="/chocolate-day" label="Chocolate Day" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default ProposeDay;
