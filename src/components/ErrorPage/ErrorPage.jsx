// ErrorPage.js
import { useNavigate } from 'react-router-dom';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate('/'); 
  };

  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>404</h1>
      <p className={styles.errorMessage}>{`Oops! The page you are looking for doesn't exist.`}</p>
      <button className={styles.backButton} onClick={handleBackHome}>
        Back to Home
      </button>
    </div>
  );
};

export default ErrorPage;
