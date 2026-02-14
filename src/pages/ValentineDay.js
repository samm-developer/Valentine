import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import DayHero from '../components/DayHero';
import './ValentineDay.css';

const ValentineDay = () => {
  const navigate = useNavigate();
  const [confetti, setConfetti] = useState([]);
  const [showQuestion, setShowQuestion] = useState(false);
  const [noCount, setNoCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [celebration, setCelebration] = useState(false);

  useEffect(() => {
    setTimeout(() => setShowQuestion(true), 1500);
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

  const handleYes = () => {
    setCelebration(true);
    createConfetti();
    setTimeout(createConfetti, 2000);
    setTimeout(createConfetti, 4000);
  };

  const handleNo = () => {
    setNoCount((prev) => prev + 1);
    setYesSize((prev) => prev + 0.15);
  };

  const noMessages = [
    "No", "Are you sure? 🥺", "Really really sure? 💔", "Think again... 😢",
    "Please? 🥹", "Don't do this to me 😭", "I'll be sad forever 💀",
    "My heart can't take it 😿", "Fine... just kidding! Try again 🤡", "PLEASEEE 🙏",
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

  const sections = [
    { icon: '💌', title: 'Love Letter', desc: "A heartfelt letter from Rajat's soul — for Mahima", path: '/letter' },
    { icon: '💖', title: 'Reasons I Love You', desc: 'Every reason my heart chose yours, beautifully told', path: '/reasons' },
    { icon: '🤞', title: 'My Promises', desc: 'Vows written in the language of forever', path: '/promises' },
    { icon: '✨', title: 'Grand Finale', desc: 'The final chapter of this love story — for now', path: '/forever' },
  ];

  return (
    <div className="valentine-page">
      <FloatingHearts />

      {/* Confetti */}
      <div className="vday-confetti-container">
        {confetti.map((c) => (
          <div
            key={c.id}
            className={`vday-confetti vday-confetti-${c.shape}`}
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

      <PageTransition>
        <DayHero
          icon="❤️"
          date="February 14th"
          title="Valentine's Day"
          subtitle="The day the world celebrates love — but for me, every day with you is a celebration"
          gradient1="#e8416f"
          gradient2="#c2185b"
        />

        <div className="valentine-content">
          {!celebration ? (
            <>
              {/* Sections to explore */}
              <div className="valentine-explore">
                <h2 className="valentine-explore__title">Explore Our Love Story, Mahima</h2>
                <div className="valentine-explore__grid">
                  {sections.map((sec, i) => (
                    <button
                      key={i}
                      className="valentine-explore__card"
                      onClick={() => navigate(sec.path)}
                      style={{ animationDelay: `${i * 0.15 + 0.5}s` }}
                    >
                      <span className="valentine-explore__icon">{sec.icon}</span>
                      <h3 className="valentine-explore__card-title">{sec.title}</h3>
                      <p className="valentine-explore__desc">{sec.desc}</p>
                      <span className="valentine-explore__arrow">→</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* The Question */}
              <div className={`valentine-question ${showQuestion ? 'show' : ''}`}>
                <div className="valentine-question__sparkles">
                  {[...Array(8)].map((_, i) => (
                    <span key={i} className="vq-sparkle" style={{ transform: `rotate(${i * 45}deg) translateY(-55px)`, animationDelay: `${i * 0.15}s` }}>✦</span>
                  ))}
                  <span className="vq-heart">💝</span>
                </div>

                <h2 className="valentine-question__text">
                  Will You Be My Valentine, Mahima?
                </h2>

                <div className="valentine-buttons">
                  <button
                    className="valentine-btn valentine-btn--yes"
                    onClick={handleYes}
                    style={{ transform: `scale(${yesSize})` }}
                  >
                    Yes, Forever! ♥
                  </button>
                  <button
                    className="valentine-btn valentine-btn--no"
                    onClick={handleNo}
                    style={getNoButtonStyle()}
                  >
                    {noMessages[Math.min(noCount, noMessages.length - 1)]}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="valentine-celebration">
              <div className="vc-burst">
                {[...Array(20)].map((_, i) => (
                  <span key={i} className="vc-burst-heart" style={{ transform: `rotate(${i * 18}deg)`, animationDelay: `${i * 0.05}s` }}>♥</span>
                ))}
              </div>

              <h1 className="vc-title">You Made Me The</h1>
              <h1 className="vc-title vc-title--big">Happiest Person Alive!</h1>

              <div className="vc-emoji">💕 🥰 💖 ✨ 💝 🌹 💗 😍</div>

              <div className="vc-quote">
                <p>
                  "And in this moment, with your 'yes' echoing in my heart,<br />
                  I promise you — every day with me will be<br />
                  Valentine's Day for the rest of our lives."
                </p>
              </div>

              <div className="vc-vows">
                <div className="vc-vow"><span>🌅</span><p>Every sunrise, I'll love you more</p></div>
                <div className="vc-vow"><span>🌙</span><p>Every moonlit night, I'll hold you closer</p></div>
                <div className="vc-vow"><span>♾️</span><p>Every heartbeat, forever yours</p></div>
              </div>

              <div className="vc-final">
                <p className="vc-together">Rajat + Mahima = ♾️</p>
                <p className="vc-date">14th February 2026</p>
                <p className="vc-forever">
                  "This is not the end of a story.<br />
                  This is the beginning of forever."
                </p>
              </div>
            </div>
          )}
        </div>
      </PageTransition>
    </div>
  );
};

export default ValentineDay;
