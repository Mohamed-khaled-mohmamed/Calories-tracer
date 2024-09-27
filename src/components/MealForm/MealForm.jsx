import { useState } from 'react';
import styles from './MealForm.module.css';
import { useReducer } from 'react';
import { act } from 'react';
import { useContext } from 'react';
import { CustomContext } from '../CustomContext/CustomContext';

const MealForm = () => {
  const { setFormData, isFormActive, setIsFormActive, selectedDate, totalCalories, handleDateChange } = useContext(CustomContext);
  const [disabledBtn, setdisabledBtn] = useState(true);
  // const [recordItem, setrecordItem] = useState(second);
  const [mealRecord, dispatch] = useReducer(validation, {
    meal: { value: 'breakfast', valid: true },
    calories: { value: 0, valid: true },
    content: { value: '', valid: false },
    date: { value: selectedDate, valid: true },
    id: self.crypto.randomUUID(),
  });

  function submitFormData(newData) {
    let uuid = self.crypto.randomUUID();
    let DataWithId = { ...newData, id: uuid };
    setFormData((prevData) => [{ ...DataWithId }, ...prevData]);
  }

  function validation(state, action) {
    function helper(action) {
      // التأكد من أن الحالة المطلوبة موجودة
      if (!state[action.name]) {
        return state; // إذا لم يكن هناك عنصر مطابق في الحالة، نعيد الحالة كما هي
      }

      const { name, value } = action;
      const currentValue = state[name].value;
      const isCalories = name === 'calories';
      const isContentSport = state.content.value === 'sport';
      const actionValueAsNumber = parseInt(value);

      // التحقق من وجود التغيير بين الحالة الحالية والقيمة الجديدة
      if (value !== currentValue) {
        // منطق خاص بـ "calories"
        if (isCalories) {
          // حالة السعرات موجبة وليس محتوى رياضي
          if (actionValueAsNumber >= 0 && !isContentSport) {
            return updateState(name, value, true);
          }
          // حالة السعرات سالبة والمحتوى رياضي
          if (actionValueAsNumber < 0 && isContentSport) {
            return updateState(name, value, true);
          }
          // أي حالات أخرى للسعرات
          return updateState(name, value, false);
        }

        // منطق خاص بـ "content"
        if (name === 'content') {
          const caloriesValid = action.value === 'sport' ? state.calories.value < 0 : state.calories.value >= 0;
          setdisabledBtn(!caloriesValid);
          return {
            ...state,
            content: { value, valid: true },
            calories: { value: state.calories.value, valid: caloriesValid },
          };
        }

        // إذا كان العنصر غير "calories" وأي تغيير حدث، سيتم تحديثه هنا
        return updateState(name, value, true);
      }

      // في حالة عدم وجود تغيير في القيمة، يتم إرجاع الحالة الحالية كما هي
      return state;

      // دالة فرعية لتحديث الحالة بشكل موحد
      function updateState(fieldName, fieldValue, isValid) {
        setdisabledBtn(!isValid);
        return {
          ...state,
          [fieldName]: { value: fieldValue, valid: isValid },
        };
      }
    }

    // يجب إرجاع نتيجة دالة helper هنا
    return helper(action);
  }

  function handleSubmit(e) {
    e.preventDefault();

    setdisabledBtn(false);

    submitFormData(mealRecord);

    setIsFormActive(false);
  }

  function handleInputChange(e) {
    let value = e.target.value;
    let name = e.target.name;
    //validation Before submit

    dispatch({ name, value });

    if (name === 'date') {
      handleDateChange(e);
    }
    // setmealRecord((prevRecord) => ({
    //   ...prevRecord,
    //   [name]: value,
    // }));
    // console.log('mealRecord updated:', mealRecord);
  }

  return (
    <div className={isFormActive ? styles.overLay : ''} onClick={() => setIsFormActive(false)}>
      <div className={isFormActive ? styles.container : styles.hidden} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.title}>Record Your Meal</h2>
        <p className="totalCalories">Total Calories: {totalCalories}</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="date" className={styles.label}>
              Date
            </label>
            <input type="date" name="date" id="date" className={styles.input} value={mealRecord.date.value} onChange={handleInputChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="meal" className={styles.label}>
              Meal
            </label>
            <select name="meal" id="meal" className={styles.select} value={mealRecord.meal.value} onChange={handleInputChange}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="content" className={styles.label}>
              Content
            </label>
            <input type="text" name="content" id="content" className={styles.input} value={mealRecord.content.value} onChange={handleInputChange} required />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="calories" className={styles.label}>
              Calories
            </label>
            <input
              type="number"
              name="calories"
              id="calories"
              className={mealRecord.calories.valid ? styles.input : styles.inputError}
              value={mealRecord.calories.value}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className={disabledBtn ? styles.disabledBtn : styles.button} disabled={disabledBtn}>
            Record Meal
          </button>
        </form>
      </div>
    </div>
  );
};

export default MealForm;
