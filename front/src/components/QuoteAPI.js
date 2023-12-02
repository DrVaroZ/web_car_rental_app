import React, { useState, useEffect } from 'react';
import './styles/quote_api.css';

const QuoteAPI = () => {
  const [quote, setQuote] = useState({ content: '', author: '' });

  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const response = await fetch('https://api.quotable.io/random');
        const quoteData = await response.json();

        if (quoteData && quoteData.content) {
          setQuote({ content: quoteData.content, author: quoteData.author });
        } else {
          console.error('Invalid quote data');
        }
      } catch (error) {
        console.error('Error fetching quote:', error.message);
      }
    };

    fetchQuote();
  }, []); 

  return (
    <div className='container'>
      <div className="quote-container">
        <p className="quote-body">{quote.content}</p>
        <p className="quote-author">- {quote.author}</p>
      </div>
    </div>
  );
};

export default QuoteAPI;
