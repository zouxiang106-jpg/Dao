import React, { useState } from 'react';
import styles from './DivinationPage.module.scss';

const DivinationPage = ({ onComplete }) => {
  const [isRotating, setIsRotating] = useState(false);

  const handleBaguaClick = () => {
    if (isRotating) return;
    
    setIsRotating(true);
    
    // Rotate for a few seconds then trigger completion
    setTimeout(() => {
      onComplete();
    }, 3000); // 3 seconds delay
  };

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <div className={styles.background}>
          <img
            src="/assets/mlaojeee-y8ekn2d.png"
            className={styles.backgroundImage}
            alt="Background Pattern"
          />
        </div>
        
        <div className={styles.content}>
          <div className={styles.baguaContainer} onClick={handleBaguaClick}>
            <img 
              src="/assets/mlaojeed-rem54l1.png" 
              className={`${styles.bagua} ${isRotating ? styles.rotating : ''}`} 
              alt="Bagua" 
            />
          </div>
          
          <p className={styles.text}>
            {isRotating ? "演卦中..." : "触盘，起卦"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DivinationPage;
