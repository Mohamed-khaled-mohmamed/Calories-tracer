import { useState } from 'react';
import MealForm from './components/MealForm/MealForm';
import MakeRecord from './components/MakeRecord/MakeRecord';
import { useEffect } from 'react';
import styles from './App.module.css';
function App() {
  const [formData, setFormData] = useState([]);
  const [activeForm, setactiveForm] = useState(false);
  const [DateSlect, setDateSlect] = useState(new Date().toISOString().split('T')[0]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('formData')) || [];
    setFormData(storedData);
  }, []);

  function addNewForm(prevData, Data) {
    return [{ ...Data }, ...prevData];
  }

  function saveToLocalStorage(Data) {
    localStorage.setItem('formData', JSON.stringify(Data));
  }

  function handelFormData(prevData, Data) {
    const newData = addNewForm(prevData, Data);
    saveToLocalStorage(newData);
    return newData;
  }

  function getFormData(Data) {
    // setFormData((prevData) => [{ ...Data }, ...prevData]);
    setFormData((prevData) => handelFormData(prevData, Data));
  }

  function getDateSlect(e) {
    let value = e.target.value;
    setDateSlect(value);
  }

  function fillterFormData(DateSlect) {
    return formData.filter((data) => data.date === DateSlect);
  }

  return (
    <div className={styles.container}>
      <div className={styles.addRecordInfo}>
        <h1 className={styles.title}>Calories Tracker</h1>

        <button className={styles.addRecordButton} onClick={() => setactiveForm(true)}>
          {/* {showForm ? 'Close Form' : 'Add Record'} */}
          Add Record
        </button>
        <input className={styles.dateInput} type="date" name="date" value={DateSlect} onChange={getDateSlect}></input>
      </div>
      {activeForm && <MealForm getFormData={getFormData} setactiveForm={setactiveForm} activeForm={activeForm} />} {/* عرض النموذج عند الحاجة */}
      <MakeRecord allRecord={fillterFormData(DateSlect)} />
    </div>
  );
}

export default App;
