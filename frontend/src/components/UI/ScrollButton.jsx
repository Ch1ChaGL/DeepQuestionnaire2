import React, { useState, useEffect } from 'react';
import styles from './ScrollButton.module.css';

const ScrollButton = () => {
  const [isTopVisible, setIsTopVisible] = useState(false);
  const [isBottomVisible, setIsBottomVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      setIsTopVisible(scrollTop > 0);
      setIsBottomVisible(scrollTop + windowHeight < documentHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.scrollButtons}>
      {isTopVisible && (
        <button className={styles.scrollButton} onClick={scrollToTop}>
          &#8593;
        </button>
      )}
      {isBottomVisible && (
        <button className={styles.scrollButton} onClick={scrollToBottom}>
          &#8595;
        </button>
      )}
    </div>
  );
};

export default ScrollButton;
