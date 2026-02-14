import React, { useEffect, useState, useCallback } from 'react';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import NavigationArrow from '../components/NavigationArrow';
import './ForeverPage.css';

const ForeverPage = () => {
  const [confetti, setConfetti] = useState([]);
  const [showContent, setShowContent] = useState(false);
  const [showQuestion, setShowQuestion] = useState(false);
  const [answered, setAnswered] = useState(false); // eslint-disable-line no-unused-vars
  const [noCount, setNoCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [celebration, setCelebration] = useState(false);
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    setTimeout(() => setShowContent(true), 500);
    setTimeout(() => setShowQuestion(true), 2000);
  }, []);

  const createConfetti = useCallback(() => {
    const newConfetti = [];
    for (let i = 0; i < 150; i++) {
      newConfetti.push({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: ['#e8416f', '#ff6b9d', '#d4a574', '#f8bbd0', '#fce4ec', '#c2185b', '#fff', '#ffd700'][
          Math.floor(Math.random() * 8)
        ],
        size: Math.random() * 8 + 4,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 1,
        shape: Math.random() > 0.5 ? 'circle' : 'rect',
      });
    }
    setConfetti(newConfetti);
  }, []);

  const createFirework = useCallback(() => {
    const fw = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 40 + 10,
    };
    setFireworks((prev) => [...prev.slice(-10), fw]);
  }, []);

  const handleYes = () => {
    setAnswered(true);
    setCelebration(true);
    createConfetti();

    const fwInterval = setInterval(createFirework, 500);
    setTimeout(() => clearInterval(fwInterval), 5000);

    setTimeout(createConfetti, 2000);
    setTimeout(createConfetti, 4000);
  };

  const handleNo = () => {
    setNoCount((prev) => prev + 1);
    setYesSize((prev) => prev + 0.15);
  };

  const noMessages = [
    "No",
    "Are you sure? 🥺",
    "Really really sure? 💔",
    "Think again... 😢",
    "Please? 🥹",
    "Don't do this to me 😭",
    "I'll be sad forever 💀",
    "My heart can't take it 😿",
    "Fine... just kidding! Try again 🤡",
    "PLEASEEE 🙏",
  ];

  const getNoButtonStyle = () => {
    if (noCount > 3) {
      return {
        fontSize: `${Math.max(0.6 - noCount * 0.04, 0.3)}rem`,
        padding: `${Math.max(8 - noCount, 2)}px ${Math.max(16 - noCount * 2, 4)}px`,
        opacity: Math.max(1 - noCount * 0.08, 0.2),
      };
    }
    return {};
  };

  return (
    <div className="forever-page">
      <FloatingHearts />

      {/* Confetti */}
      <div className="confetti-container">
        {confetti.map((c) => (
          <div
            key={c.id}
            className={`confetti-piece confetti-${c.shape}`}
            style={{
              left: `${c.left}%`,
              backgroundColor: c.color,
              width: `${c.size}px`,
              height: c.shape === 'rect' ? `${c.size * 2.5}px` : `${c.size}px`,
              animationDuration: `${c.duration}s`,
              animationDelay: `${c.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Fireworks */}
      {fireworks.map((fw) => (
        <div
          key={fw.id}
          className="firework"
          style={{ left: `${fw.x}%`, top: `${fw.y}%` }}
        >
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="firework__particle"
              style={{
                transform: `rotate(${i * 30}deg)`,
                backgroundColor: ['#e8416f', '#ffd700', '#ff6b9d', '#fff'][i % 4],
              }}
            />
          ))}
        </div>
      ))}

      <PageTransition>
        <div className="forever-container">
          {!celebration ? (
            <>
              <div className={`forever-header ${showContent ? 'show' : ''}`}>
                <div className="forever-sparkle-ring">
                  {[...Array(8)].map((_, i) => (
                    <span
                      key={i}
                      className="sparkle"
                      style={{
                        transform: `rotate(${i * 45}deg) translateY(-45px)`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    >
                      ✦
                    </span>
                  ))}
                  <span className="forever-heart">💝</span>
                </div>

                <h1 className="forever-title">One Last Thing...</h1>

                <div className="forever-poem">
                  <p>"Before the stars forget to shine,</p>
                  <p>Before the rivers cease to flow,</p>
                  <p>Before my heart forgets to beat —</p>
                  <p>There's something you should know..."</p>
                </div>
              </div>

              <div className={`forever-question ${showQuestion ? 'show' : ''}`}>
                <h2 className="forever-question__text">
                  Will You Be My Valentine, Mahima? 💕
                </h2>

                <div className="forever-buttons">
                  <button
                    className="forever-btn forever-btn--yes"
                    onClick={handleYes}
                    style={{ transform: `scale(${yesSize})` }}
                  >
                    Yes, Forever! ♥
                  </button>
                  <button
                    className="forever-btn forever-btn--no"
                    onClick={handleNo}
                    style={getNoButtonStyle()}
                  >
                    {noMessages[Math.min(noCount, noMessages.length - 1)]}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="celebration">
              <div className="celebration__hearts-burst">
                {[...Array(20)].map((_, i) => (
                  <span
                    key={i}
                    className="burst-heart"
                    style={{
                      transform: `rotate(${i * 18}deg)`,
                      animationDelay: `${i * 0.05}s`,
                    }}
                  >
                    ♥
                  </span>
                ))}
              </div>

              <h1 className="celebration__title">You Made Me The</h1>
              <h1 className="celebration__title celebration__title--big">
                Happiest Person Alive!
              </h1>

              <div className="celebration__emoji-rain">
                💕 🥰 💖 ✨ 💝 🌹 💗 😍
              </div>

              <div className="celebration__quote">
                <p>
                  "And in this moment, with your 'yes' echoing in my heart,<br />
                  I promise you — every day with me will be<br />
                  Valentine's Day for the rest of our lives."
                </p>
              </div>

              <div className="celebration__vows">
                <div className="vow-card">
                  <span>🌅</span>
                  <p>Every sunrise, I'll love you more</p>
                </div>
                <div className="vow-card">
                  <span>🌙</span>
                  <p>Every moonlit night, I'll hold you closer</p>
                </div>
                <div className="vow-card">
                  <span>♾️</span>
                  <p>Every heartbeat, forever yours</p>
                </div>
              </div>

              <div className="celebration__final">
                <p className="celebration__together">Rajat + Mahima = ♾️</p>
                <p className="celebration__date">14th February 2026</p>
                <p className="celebration__forever">
                  "This is not the end of a story.<br />
                  This is the beginning of forever."
                </p>
              </div>
            </div>
          )}

          <div className="forever-nav">
            <NavigationArrow to="/promises" label="Promises" direction="left" />
            <NavigationArrow to="/" label="Start Over" direction="right" />
          </div>
        </div>
      </PageTransition>
    </div>
  );
};

export default ForeverPage;
