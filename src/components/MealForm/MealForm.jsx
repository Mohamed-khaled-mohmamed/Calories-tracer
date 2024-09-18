import { useState } from 'react';
import styles from './MealForm.module.css';

const MealForm = ({ getFormData, setactiveForm, activeForm }) => {
  const [mealRecord, setmealRecord] = useState({
    meal: 'breakfast',
    calories: 10,
    content: '',
    date: new Date().toISOString().split('T')[0],
  });

  function handleSubmit(e) {
    e.preventDefault();
    getFormData(mealRecord);
    setactiveForm(false);
  }

  function getmealRecord(e) {
    let value = e.target.value;
    let name = e.target.name;
    setmealRecord((prevRecord) => ({
      ...prevRecord,
      [name]: value,
    }));
    console.log('mealRecord updated:', mealRecord);
  }

  return (
    <div className={activeForm ? styles.overLay : ''} onClick={() => setactiveForm(false)}>
      <div className={activeForm ? styles.container : styles.hidden} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Record Your Meal</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input type="date" name="date" id="date" className={styles.input} value={mealRecord.date} onChange={getmealRecord} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="meal" className={styles.label}>
              Meal
            </label>
            <select name="meal" id="meal" className={styles.select} value={mealRecord.meal} onChange={getmealRecord}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="content" className={styles.label}>
              Content
            </label>
            <input type="text" name="content" id="content" className={styles.input} value={mealRecord.content} onChange={getmealRecord} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="calories" className={styles.label}>
              Calories
            </label>
            <input type="number" name="calories" id="calories" className={styles.input} value={mealRecord.calories} onChange={getmealRecord} required min={10} />
          </div>

          <button type="submit" className={styles.button}>
            Record Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
