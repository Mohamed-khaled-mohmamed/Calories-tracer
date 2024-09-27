// HomePage.jsx
import styles from './HomePage.module.css';

export default function HomePage() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.title}>Welcome to Calories Tracker!</h1>
      <p className={styles.description}>
        This application helps you track your daily calorie intake and maintain a healthy lifestyle.
      </p>
    </div>
  );
}
