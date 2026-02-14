import React from 'react';
import './QuoteCard.css';

const QuoteCard = ({ quote, author, accent }) => {
  return (
    <div className="quote-card" style={{ '--accent': accent || 'var(--rose)' }}>
      <div className="quote-card__mark">"</div>
      <p className="quote-card__text">{quote}</p>
      {author && <span className="quote-card__author">— {author}</span>}
      <div className="quote-card__glow"></div>
    </div>
  );
};

export default QuoteCard;
