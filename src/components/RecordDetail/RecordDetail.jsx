import { useNavigate, useParams } from 'react-router-dom';
import { useContext } from 'react';
import { CustomContext } from '../CustomContext/CustomContext';
import styles from './RecordDetail.module.css';
import ErrorPage from '../ErrorPage/ErrorPage';
import { useEffect } from 'react';

function RecordDetail() {
  const FormData = JSON.parse(localStorage.getItem('formData'));
  const { setSelectedDate } = useContext(CustomContext);

  const { recordID } = useParams();
  let newFormData = FormData.filter((record) => record.id === recordID);

  const navigate = useNavigate();

    useEffect(() => {
      if (newFormData.length > 0) {
        setSelectedDate(new Date(newFormData[0].date.value).toISOString().split('T')[0]);
      }
    }, []);
  
  const handleBack = () => {
    // تعيين التاريخ قبل الرجوع
    // setSelectedDate(new Date(newFormData[0].date.value).toISOString().split('T')[0]);
    navigate(-1);
  };

  return (
    <>
      {newFormData.length > 0 ? (
        <>
          <button className={styles.backButton} onClick={handleBack}>
            Back
          </button>

          {newFormData.map((record) => (
            <div key={record.id} className={styles.recordContainer}>
              <div className={`${styles.recordItem} ${styles.date}`}>
                <div className="tiltel">date</div>
                <div className="value">{record.date.value}</div>
              </div>
              <div className={`${styles.recordItem} ${styles.meal}`}>
                <div className="tiltel"> Meal</div>
                <div className="value"> {record.meal.value}</div>
              </div>
              <div className={`${styles.recordItem} ${styles.content}`}>
                <div className="tiltel">Content</div>
                <div className="value"> {record.content.value}</div>
              </div>
              <div className={`${styles.recordItem} ${styles.calories}`}>
                <div className="tiltel">Calories</div>
                <div className="value"> {record.calories.value}</div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default RecordDetail;
