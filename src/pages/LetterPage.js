import React, { useEffect, useState, useRef } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import NavigationArrow from '../components/NavigationArrow';
import { CREATOR_NAME, RECIPIENT_NAME } from '../config';
import './LetterPage.css';

const letterText = `My Dearest ${RECIPIENT_NAME},

Every morning I wake up, and the very first thought that dances through my mind is you. Your smile — that magical, breathtaking smile — has the power to turn my darkest days into the most beautiful ones.

Before you, I never knew what it meant to find home in someone's eyes. But now I know — home isn't a place, it's wherever you are. In your arms, I have found a peace that the whole world couldn't give me.

You are not just the love of my life — you are the life of my love. Every heartbeat of mine whispers your name, every dream of mine begins and ends with you.

I don't need the stars when I have the sparkle in your eyes. I don't need poetry when your laughter writes the most beautiful verses in my soul. I don't need forever when every moment with you already feels like eternity.

They say love makes you weak, but loving you has made me the strongest version of myself. You gave me a reason to believe in magic again.

If I had to choose between breathing and loving you, I would use my last breath to say — I love you.

Today, tomorrow, and for all the tomorrows after that — you are my always.

Forever Yours,
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
              <p className="letter-subtitle">Written with every beat of my heart — From {CREATOR_NAME}</p>
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
