import React from 'react';
import styles from './MakeRecord.module.css';
import { useContext } from 'react';
import { CustomContext } from '../CustomContext/CustomContext';
import { Navigate, useNavigate } from 'react-router-dom';

export default function MakeRecord({ allRecord }) {
  const { setFormData } = useContext(CustomContext);
  const navegate = useNavigate();
  function deleteRecrd(id) {
    const FormData = JSON.parse(localStorage.getItem('formData'));
    let newFormData = FormData.filter((record) => record.id !== id);
    console.log(newFormData);
    setFormData(newFormData);
    // localStorage.setItem('FormData', JSON.stringify(newFormData));
  }
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Records</h3>
      <div className={styles.recordsContainer}>
        {allRecord.map((record) => (
          <div key={record.id} className={styles.recordContainer} dataid={record.id} onClick={() => navegate(`${record.id}`)}>
            <div className={`${styles.recordItem} ${styles.date}`}>{record.date.value}</div>
            <div className={`${styles.recordItem} ${styles.meal}`}>{record.meal.value}</div>
            <div className={`${styles.recordItem} ${styles.content}`}>{record.content.value}</div>
            <div className={`${styles.recordItem} ${styles.calories}`}>{record.calories.value}</div>
            <button
              className={styles.recordBtn}
              onClick={(e) => {
                e.stopPropagation();
                deleteRecrd(record.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
