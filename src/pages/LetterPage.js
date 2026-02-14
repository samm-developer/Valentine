import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import NavigationArrow from '../components/NavigationArrow';
import { CREATOR_NAME, RECIPIENT_NAME } from '../config';
import './LetterPage.css';

const letterText = `My Dear Friend ${RECIPIENT_NAME},

I wanted to take a moment to tell you how much you mean to me. Your smile — that warm, genuine smile — has the power to brighten my darkest days. You've been there when I needed someone the most, and for that I'm endlessly grateful.

Before you came into my life, I didn't know how much a true friend could matter. But now I do — you're the person I can be myself with, the one who listens without judgment, and the one who makes ordinary moments feel special.

You're not just a friend — you're one of the best people I know. Your kindness, your strength, and your laughter have made my life so much richer. Every adventure with you becomes a memory I cherish.

I don't need grand gestures when I have your friendship. I don't need the world when we're laughing over nothing. I don't need forever promises — our friendship already feels like it will last a lifetime.

They say friends are the family we choose. Well, I'm so glad the universe brought you into my life. You make me want to be a better person.

If I had to describe what you mean to me in one sentence — I'd say you're the kind of friend everyone wishes they had.

Today, tomorrow, and for all the tomorrows after that — I'm grateful for you.

Your friend always,
${CREATOR_NAME} ♥`;

const LetterPage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showEnvelope, setShowEnvelope] = useState(true);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const textRef = useRef(null);

  const openEnvelope = () => {
    setEnvelopeOpen(true);
    setTimeout(() => {
      setShowEnvelope(false);
    }, 1500);
  };

  useEffect(() => {
    if (showEnvelope) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < letterText.length) {
        setDisplayedText(letterText.slice(0, index + 1));
        index++;
        if (textRef.current) {
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 25);

    return () => clearInterval(timer);
  }, [showEnvelope]);

  return (
    <div className="letter-page">
      <FloatingHearts />

      {showEnvelope && (
        <div className={`envelope-container ${envelopeOpen ? 'opening' : ''}`}>
          <div className="envelope" onClick={openEnvelope}>
            <div className="envelope__flap"></div>
            <div className="envelope__body">
              <div className="envelope__heart">♥</div>
              <p className="envelope__text">Tap to open</p>
            </div>
            <div className="envelope__shadow"></div>
          </div>
          <p className="envelope__label">A Letter From {CREATOR_NAME}'s Heart</p>
        </div>
      )}

      {!showEnvelope && (
        <PageTransition>
          <div className="letter-container">
            <div className="letter-header">
              <div className="letter-seal">♥</div>
              <h2 className="letter-title">A Letter For {RECIPIENT_NAME}</h2>
              <p className="letter-subtitle">Written from the heart — From {CREATOR_NAME}</p>
            </div>

            <div className="letter-paper" ref={textRef}>
              <div className="letter-paper__corner letter-paper__corner--tl"></div>
              <div className="letter-paper__corner letter-paper__corner--tr"></div>
              <div className="letter-paper__corner letter-paper__corner--bl"></div>
              <div className="letter-paper__corner letter-paper__corner--br"></div>

              <div className="letter-text">
                {displayedText.split('\n').map((line, i) => (
                  <p key={i} className={line === '' ? 'letter-gap' : 'letter-line'}>
                    {line}
                  </p>
                ))}
                {isTyping && <span className="letter-cursor">|</span>}
              </div>
            </div>

            <div className="letter-nav">
              <NavigationArrow to="/" label="Back" direction="left" />
              <NavigationArrow to="/reasons" label="Next Chapter" direction="right" />
            </div>
          </div>
        </PageTransition>
      )}
    </div>
  );
};

export default LetterPage;
