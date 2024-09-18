import React from 'react';
import styles from './MakeRecord.module.css';

export default function MakeRecord({ allRecord }) {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Records</h3>
      <div className={styles.recordContainer}>
        {allRecord.map((record, i) => (
          <React.Fragment key={i}>
            <div className={`${styles.recordItem} ${styles.date}`}>{record.date}</div>
            <div className={`${styles.recordItem} ${styles.meal}`}>{record.meal}</div>
            <div className={`${styles.recordItem} ${styles.content}`}>{record.content}</div>
            <div className={`${styles.recordItem} ${styles.calories}`}>{record.calories}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
