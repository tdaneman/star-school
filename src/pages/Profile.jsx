import { useProgress } from '../context/ProgressContext'
import signs from '../data/signs.json'
import planets from '../data/planets.json'
import styles from './Profile.module.css'

export default function Profile() {
  const { isDone } = useProgress()

  const signsDone = signs.filter(s => isDone('signs', s.id)).length
  const planetsDone = planets.filter(p => isDone('planets', p.id)).length

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Profile</h1>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.count}>{signsDone}<span className={styles.total}> / {signs.length}</span></span>
          <span className={styles.label}>Signs</span>
        </div>
        <div className={styles.divider} />
        <div className={styles.stat}>
          <span className={styles.count}>{planetsDone}<span className={styles.total}> / {planets.length}</span></span>
          <span className={styles.label}>Planets</span>
        </div>
      </div>
      {signsDone === 0 && planetsDone === 0 && (
        <p className={styles.prompt}>Complete a quiz to track your progress.</p>
      )}
    </div>
  )
}
