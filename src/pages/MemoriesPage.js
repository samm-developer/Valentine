import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingHearts from '../components/FloatingHearts';
import PageTransition from '../components/PageTransition';
import { getGalleryImages } from '../data/galleryImages';
import './MemoriesPage.css';

const MemoriesPage = () => {
  const navigate = useNavigate();
  const images = getGalleryImages();
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, Number(entry.target.dataset.index)]));
          }
        });
      },
      { threshold: 0.1 }
    );
    cardRefs.current.forEach((ref) => ref && observer.observe(ref));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (lightboxIndex === null) return;
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowRight') setLightboxIndex((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setLightboxIndex((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, images.length]);

  return (
    <div className="memories-page">
      <FloatingHearts />

      <PageTransition>
        <div className="memories-container">
          <header className="memories-hero">
            <span className="memories-hero__icon">🖼️</span>
            <p className="memories-hero__date">Story in Frames</p>
            <h1 className="memories-hero__title">Memories</h1>
            <p className="memories-hero__subtitle">
              "Every photo is a love letter to the moments we've shared —<br />
              and a promise of countless more to come."
            </p>
            <div className="memories-hero__divider">
              <div className="memories-hero__line"></div>
              <span>♥</span>
              <div className="memories-hero__line"></div>
            </div>
          </header>

          <div className="memories-gallery">
            {images.map((img, index) => (
              <div
                key={img.id}
                ref={(el) => (cardRefs.current[index] = el)}
                data-index={index}
                className={`memory-card ${visibleCards.has(index) ? 'visible' : ''}`}
                style={{ transitionDelay: `${(index % 6) * 0.1}s` }}
                onClick={() => setLightboxIndex(index)}
              >
                <div className="memory-card__frame">
                  <img
                    src={img.src}
                    alt={img.caption}
                    className="memory-card__img"
                    loading="lazy"
                  />
                  <div className="memory-card__overlay">
                    <span className="memory-card__caption">"{img.caption}"</span>
                    <span className="memory-card__zoom">⊕</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="memories-footer">
            <p className="memories-footer__quote">
              "I don't need a camera to remember you. But I'm glad I have these —<br />
              so I can show the world how beautiful you looks."
            </p>
            <button className="memories-footer__btn" onClick={() => navigate('/valentine-day')}>
              Back to Valentine's Day ♥
            </button>
          </div>
        </div>
      </PageTransition>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="memories-lightbox"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
          aria-label="View photo"
        >
          <button
            className="memories-lightbox__close"
            onClick={() => setLightboxIndex(null)}
            aria-label="Close"
          >
            ×
          </button>
          <button
            className="memories-lightbox__prev"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i - 1 + images.length) % images.length);
            }}
            aria-label="Previous"
          >
            ‹
          </button>
          <button
            className="memories-lightbox__next"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxIndex((i) => (i + 1) % images.length);
            }}
            aria-label="Next"
          >
            ›
          </button>
          <div className="memories-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[lightboxIndex].src}
              alt={images[lightboxIndex].caption}
              className="memories-lightbox__img"
            />
            <p className="memories-lightbox__caption">"{images[lightboxIndex].caption}"</p>
            <span className="memories-lightbox__counter">
              {lightboxIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoriesPage;
