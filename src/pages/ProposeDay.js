import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import QuoteCard from '../components/QuoteCard';
import NavigationArrow from '../components/NavigationArrow';
import './DayPages.css';

const proposalSteps = [
  { step: '01', title: 'The First Glance', text: 'The moment our eyes met, something shifted in the universe. It was as if every star aligned just to bring you into my world.', icon: '👀' },
  { step: '02', title: 'The First Conversation', text: 'Your words wrapped around my heart like a warm embrace. I knew right then — I wanted to hear your voice for the rest of my life.', icon: '💬' },
  { step: '03', title: 'The First Smile', text: 'When you smiled at me, time stood still. The whole world faded away, and all I could see was you — glowing, radiant, perfect.', icon: '😊' },
  { step: '04', title: 'The Realization', text: 'It wasn\'t a thunderbolt. It was a gentle wave that washed over me — the quiet certainty that you were the one my heart had been waiting for.', icon: '💡' },
  { step: '05', title: 'The Courage', text: 'Every love worth having requires courage. And for you, I would find the courage to cross oceans, climb mountains, and bare my entire soul.', icon: '🦁' },
  { step: '06', title: 'The Proposal', text: 'So here I am, standing before you with nothing but a heart full of love and a soul that belongs to you. Will you let me love you — today, tomorrow, and forever?', icon: '💝' },
];

const quotes = [
  { quote: "I wasn't looking for love when I found you. But love, it seems, had been looking for me — and it led me straight to your heart.", author: "My Confession" },
  { quote: "They say 'I love you' are three words. But when I say them to you, they carry the weight of a thousand promises and a million tomorrows.", author: "For You Only" },
  { quote: "I don't just want to be a chapter in your life. I want to be the whole story — the plot twist, the happy ending, and every beautiful page in between.", author: "Your Forever" },
  { quote: "Before you, I never believed in magic. But then you walked into my life, and I realized — you ARE the magic I'd been searching for.", author: "Spellbound" },
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
          subtitle="The day I chose you — and I would choose you in a hundred lifetimes"
          gradient1="#9c27b0"
          gradient2="#e040fb"
        />

        <div className="day-content">
          <div className="day-section day-section--intro">
            <p className="day-intro-text">
              Love doesn't announce itself with fanfare. It arrives softly,
              like a whisper in the night, and before you know it — it has rewritten
              the entire story of your life. This is my story of choosing you.
            </p>
          </div>

          {/* Journey Steps */}
          <div className="day-section">
            <h2 className="day-section__title">Our Love Story</h2>
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
            <h2 className="day-section__title">My Heart Speaks</h2>
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
                I'm proposing with my entire heart, my every dream,<br />
                and every breath I have left in this life.<br /><br />
                Will you be mine — not just today, but forever?"
              </p>
              <span className="special-message__signature">— Rajat</span>
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
