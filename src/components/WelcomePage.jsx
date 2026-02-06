import React from 'react';
import styles from './WelcomePage.module.scss';

const WelcomePage = ({ onNext }) => {
  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <div className={styles.background} />
        <img
          src="/assets/mlaojax4-x7bsj5y.png"
          className={styles.backgroundImage}
          alt="Background"
        />
        
        <div className={styles.content}>
          <p className={styles.poem}>
            信士，当下相遇，便是道缘
            <br />
            若要预候天机，必先一念净心
            <br />
            摒除杂绪
            <br />
            默诵心中疑惑
            <br />
            谨记：卦映当下，心动则局生
          </p>

          <div className={styles.clickArea} onClick={onNext}>
            <p className={styles.clickText}>点击</p>
            <img src="/assets/mlaojax2-a721j3z.png" className={styles.clickIcon} alt="Click" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
