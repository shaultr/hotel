import styles from './style.module.css';

export default function Menu() {
  return (
    <div className={styles.menu}>
      <h3>🌟🌟🌟🌟🌟</h3>
      <h1>wellcome to the hotel</h1>
      <div>
      <a href='#' className={styles.a}>  גלריה  </a>
      <a href='#' className={styles.a}> | חדרי המלון  </a>
      <a href='#' className={styles.a}> | מבצעים  |</a>
      <a href='#' className={styles.a}>   צור קשר  </a>
    
   


      </div>
    </div>
  )
}