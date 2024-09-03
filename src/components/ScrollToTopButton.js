import React, { useState, useEffect } from 'react';

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => {
    if (window.scrollY > 100) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            backgroundColor: '#212529',
            color: '#fff',
            border: '2px solid white',
            borderRadius:"10px",
            height: '50px',
            width: '50px',
            cursor: 'pointer',
            zIndex: 1000,
          }}
        >
            <i className="fa-solid fa-chevron-up"></i>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
