import React, { useEffect, useState } from 'react';
import styles from './ResultPage.module.scss';
import { generate_gua } from '../utils/divination';

const ResultPage = () => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    // Generate result on mount
    const gua = generate_gua();
    console.log("Divination Result:", gua);
    setResult(gua);
  }, []);

  if (!result) return <div className={styles.loading}>计算中...</div>;

  return (
    <div className={styles.container}>
      <div className={styles.frame}>
        <div className={styles.background}>
          <img
            src="/assets/mlaojiqf-jlv3pp7.png"
            className={styles.backgroundImage}
            alt="Background"
          />
        </div>

        <p className={styles.title}>你的卦象是：</p>

        <div className={styles.resultBox}>
          <div className={styles.resultContent}>
            <div className={styles.resultItem}>
              <span className={styles.label}>本卦：</span>
              <span className={styles.value}>{result.ben_gua.name} ({result.ben_gua.symbol})</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.label}>变卦（之卦）：</span>
              <span className={styles.value}>{result.zhi_gua.name} ({result.zhi_gua.symbol})</span>
            </div>
            <div className={styles.resultItem}>
              <span className={styles.label}>变爻总数：</span>
              <span className={styles.value}>{result.bian_yao.count}个</span>
            </div>
            {result.bian_yao.count > 0 && (
              <div className={styles.resultItem}>
                <span className={styles.label}>变爻位置列表：</span>
                <span className={styles.value}>{result.bian_yao.list.join('、')}</span>
              </div>
            )}
            
            <div className={styles.yaoList}>
               {/* Display the visual lines if space permits, or just the text summary */}
               {result.yao_display_list.map((line, idx) => (
                 <div key={idx} className={styles.yaoLine}>{line}</div>
               ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;
