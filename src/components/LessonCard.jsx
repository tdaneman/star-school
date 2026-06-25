import { useNavigate } from 'react-router-dom'
import styles from './LessonCard.module.css'

export default function LessonCard({ item, type }) {
  const navigate = useNavigate()

  const meta = type === 'signs'
    ? `${item.modality} ${item.element} · Ruled by ${item.ruler}`
    : `${item.cycle} · Rules ${item.rules}`

  return (
    <article className={styles.card}>
      <div className={styles.symbolWrap}>
        <span className={styles.symbol}>{item.symbol}</span>
      </div>

      <div className={styles.nameBlock}>
        <h1 className={styles.name}>{item.name}</h1>
        <p className={styles.meta}>{meta}</p>
      </div>

      <p className={styles.tagline}>{item.tagline}</p>

      <div className={styles.pills}>
        {item.wordPills.map((pill, i) => (
          <span key={i} className={styles.pill}>{pill}</span>
        ))}
      </div>

      <p className={styles.archetype}>{item.archetype}</p>

      <div className={styles.shadowBox}>
        <span className={styles.shadowLabel}>Shadow</span>
        <p className={styles.shadowText}>{item.shadow}</p>
      </div>

      <button
        className={styles.quizButton}
        onClick={() => navigate(`/quiz/${type}/${item.id}`)}
      >
        Test Your Understanding
      </button>
    </article>
  )
}
