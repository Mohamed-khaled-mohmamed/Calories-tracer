import { useContext } from 'react';
import {} from 'module';
import { CustomContext } from '../CustomContext/CustomContext';
import styles from './mainContent.module.css';
import MealForm from '../MealForm/MealForm';
import MakeRecord from '../MakeRecord/MakeRecord';
import { useEffect } from 'react';

function MainContent() {
  const { handleDateChange, formData, setFilteredData, isFormActive, setIsFormActive, setTotalCalories, selectedDate, totalCalories, filteredData, setFormData } = useContext(CustomContext);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(storedData);
  }, []);

  useEffect(() => {
    if (formData.length > 0) localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const filtered = formData.filter((data) => data.date.value === selectedDate);
    const total = filtered.reduce((acc, cur) => acc + parseInt(cur.calories.value), 0);

    setFilteredData(filtered);
    setTotalCalories(total);
  }, [selectedDate, formData]);

  return (
    <div className={styles.container}>
      <div className={styles.addRecordInfo}>
        <h1 className={styles.title}>Calories Tracker</h1>

        <input className={styles.dateInput} type="date" name="date" value={selectedDate} onChange={handleDateChange} />
      </div>
      
      <button className={styles.addRecordButton} onClick={() => setIsFormActive(true)}>
        Add Record
      </button>
      {isFormActive && <MealForm />}

      <MakeRecord allRecord={filteredData} />

      <p className={styles.totalCalories}>Total Calories: {totalCalories}</p>
    </div>
  );
}

export default MainContent;
